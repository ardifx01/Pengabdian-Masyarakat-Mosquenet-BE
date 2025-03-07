import axios from "axios";
import userServices from "./user-services.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import paymentValidation from "../validation/payment-validation.js";
import crypto from 'crypto';

const createKasPayment = async (request) => {
  request = validate(paymentValidation.createPaymentSchema, request);
  try {
    const user_id = await userServices.getUserBasedHashID(request.user_id);
    if(!user_id) {
      return {
        message: "Akses Illegal!",
        status: 400
      };
    }

    const user = await prismaClient.users.findFirst({
      where: {
        id: user_id.id
      },
      select: {
        id: true,
        email: true,
        telp: true,
        name: true,
        jamaah: {
          select: {
            masjid: true
          }
        }
      }
    });

    if(user) {
      const paymentData = {
        payment_type: "qris",
        transaction_details: {
          order_id: `${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getDate()}${user.id}${user.jamaah.masjid.id}`,
          gross_amount: request.amount
        },
        item_details: [
          {
            name: `Pembayaran Kas ${user.jamaah.masjid.name}`,
            quantity: 1,
            price: request.amount
          }
        ],
        customer_details: {
          email: user.email,
          phone: user.telp,
          first_name: user.name.split(' ')[0],
          last_name: user.name.split(' ').length > 1 ? user.name.split(' ')[-1] : " "
        },
        qris: {
          acquirer: "gopay"
        }
      }
  
      const token = Buffer.from(process.env.SERVER_KEY + ":").toString("base64");
  
      const response = await axios.post(process.env.PAYMENT_REQUEST_URL, paymentData, {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });

      const createPayment = await prismaClient.payment.create({
        data: {
          id: response.data.order_id,
          status: response.data.transaction_status.toUpperCase(),
          amount: Number(response.data.gross_amount),
          masjid_id: user.jamaah.masjid.id,
          qr_string: response.data.actions[0].url,
        }
      })

      if(createPayment) {
        const createKas = await prismaClient.kas.create({
          data: {
            admin_id: user.id,
            payment_id: createPayment.id
          }
        });
    
        if(createKas) {
          return {
            status: 200,
            message: "Berhasil mendapatkan QR Code",
            payment: {
              status: response.data.transaction_status.toUpperCase(),
              amount: response.data.gross_amount,
              qr: response.data.actions[0].url,
              merchant_id: response.data.merchant_id,
              order_id: response.data.order_id
            }
          };
        } else {
          return {
            status: 500,
            message: "Gagal mendapatkan QR Code"
          };
        }
      } else {
        return {
          status: 500,
          message: "Gagal mendapatkan QR Code"
        };
      }

    } else {
      return {
        status: 400,
        message: "Akses Ilegal! User tidak ditemukan"
      };
    }

  } catch (e) {
    console.log(e);
    return {
      message: "Gagal membuat invoice!",
      status: 500
    };
  }
}

const generateSignatureKey = (orderId, statusCode, grossAmount) => {
  const signature = `${orderId}${statusCode}${grossAmount}${process.env.SERVER_KEY}`
  return crypto.createHash('sha512').update(signature).digest('hex');
}

const paymentCallback = async (request) => {
  const { order_id, status_code, gross_amount, signature_key, transaction_status } = request;
  const payment = await prismaClient.payment.findFirst({
    where: {
      id: order_id
    }
  });

  if(!payment) {
    return {
      message: "Transaksi tidak ditemukan!",
      status: 400
    }
  }

  const validSignature = generateSignatureKey(order_id, status_code, gross_amount);
  
  if(validSignature === signature_key) {
    const updatePayment = await prismaClient.payment.update({
      where: {
        id: order_id
      },
      data: {
        status: transaction_status === "capture" || transaction_status === "settlement" 
          ? "PAID"
          : "PENDING"
      }
    });

    // Payout
    // if(transaction_status === "capture" || transaction_status === "settlement") {
    //   try {
    //     const response = await axios.post(
    //       process.env.DISBURSEMENT_REQUEST_URL,
    //       {
    //         headers: {
    //           Authorization: `Basic ${token}`,
    //           "Content-Type": "application/json",
    //           Accept: "application/json",
    //           "X-Idempotency-Key": order_id
    //         }
    //       }
    //     )
    //   } catch (e) {

    //   }
    // }

    if(updatePayment) {
      return {
        message: "Transaksi berhasil dilakukan",
        status: 200
      }
    } else {
      return {
        message: "Update Data gagal dilakukan!",
        status: 500
      }
    }
  } else {
    return {
      message: "Data yang diberikan tidak valid!",
      status: 400
    };
  }
}

const checkPayment = async (request) => {
  request = validate(paymentValidation.checkPaymentSchema, request);
  const kas = await prismaClient.payment.findFirst({
    where: {
      id: request.id
    }
  });

  if(kas && kas.status === "PAID") {
    return {
      message: "Pembayaran Kas berhasil dilakukan",
      status: 200,
      success: true
    }
  } else {
    return {
      message: "Pembayaran kas belum berhasil! Harap tunggu sebentar lagi",
      status: 500,
      success: false
    }
  }
}

export default {
  createKasPayment,
  paymentCallback,
  checkPayment
}