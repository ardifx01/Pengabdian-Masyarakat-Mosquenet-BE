import { prismaClient } from "../application/database.js";
import { getDonationSchema, updateDonationSchema } from "../validation/donation-validation.js";
import { validate } from "../validation/validation.js";
import jwt from 'jsonwebtoken'

const getDonation = async (request) => {
  request = validate(getDonationSchema, request);

  const donation = await prismaClient.donation.findMany({
    where: {
      masjid_id: request
    }
  });

  const resultDonation = donation.map((value) => ({
    ...value,
    id: jwt.sign(String(value.id), process.env.SECRET_KEY),
    masjid_id: jwt.sign(String(value.masjid_id), process.env.SECRET_KEY)
  }));

  return resultDonation;
}

const changeDonationStatus = async (request) => {
  request = validate(updateDonationSchema, request);

  const masjid_id = Number(jwt.verify(request.masjid_id, process.env.SECRET_KEY));
  const donation_id = Number(jwt.verify(request.donation_id, process.env.SECRET_KEY));

  const findDonation = await prismaClient.donation.findFirst({
    where: {
      masjid_id: masjid_id,
      id: donation_id
    }
  });

  if(findDonation) {
    const updateDonation = await prismaClient.donation.update({
      where: {
        masjid_id: masjid_id,
        id: donation_id
      },
      data: {
        verified: request.verified
      }
    });

    if(updateDonation) {
      return {
        message: "Donasi masjid berhasil diupdate",
        status: 200
      };
    } else {
      return {
        message: "Donasi Masjid gagal diupdate",
        status: 500
      };
    }
  } else {
    return {
      message: "Masjid atau Donasi Masjid tidak valid",
      status: 400
    };
  }
}

export default {
  getDonation,
  changeDonationStatus
}