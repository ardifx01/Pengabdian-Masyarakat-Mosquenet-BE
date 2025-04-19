import path from "path";
import { prismaClient } from "../application/database.js";
import accountBankValidation from "../validation/account-bank-validation.js"
import { validate } from "../validation/validation.js"
import mosqueServices from "./mosque-services.js";
import jwt from 'jsonwebtoken';

const createPurpose = async (request) => {
  request = validate(accountBankValidation.createPurposeSchema, request);

  const masjid_id = await mosqueServices.getMasjidId(request.user_id);
  if(masjid_id.status) {
    return masjid_id;
  }

  const checkPurpose = await prismaClient.purposeAccountBank.findMany({
    where: {
      masjid_id: masjid_id
    }
  });

  if(checkPurpose) {
    const validatePurpose = checkPurpose.find(value => value.name === request.name);
    if(validatePurpose) {
      return {
        message: "Tujuan akun bank telah ditambahkan!",
        status: 400
      };
    }
  }

  const data = await prismaClient.purposeAccountBank.create({
    data: {
      name: request.name,
      masjid_id: masjid_id
    }
  });

  if(data) {
    return {
      message: "Tujuan akun bank berhasil ditambahkan!",
      status: 200
    };
  } else {
    return {
      message: "Tujuan akun bank gagal ditambahkan",
      status: 500
    };
  }
}

const getPurpose = async (request) => {
  request = validate(accountBankValidation.getPurposeSchema, request);

  const masjid_id = await mosqueServices.getMasjidId(request);
  if(masjid_id.status) {
    return masjid_id;
  }

  const purposes = await prismaClient.purposeAccountBank.findMany({
    where: {
      masjid_id: masjid_id
    },
    select: {
      id: true,
      name: true
    }
  });

  if(purposes) {
    return {
      message: "Tujuan akun bank berhasil didapatkan!",
      status: 200,
      purposes: purposes
    };
  } else {
    return {
      message: "Tujuan akun bank gagal didapatkan!",
      status: 500
    };
  }
}

const createAccount = async (request, requestFiles) => {
  request = validate(accountBankValidation.createAccountSchema, request);

  const purpose = await prismaClient.purposeAccountBank.findFirst({
    where: {
      id: request.purpose_id
    }
  });

  if(purpose) {
    const imagePath = requestFiles?.image ? path.join('transaction/images', requestFiles.image[0].filename) : "";

    const saveAccount = await prismaClient.accountBank.create({
      data: {
        name: request.name,
        bank: request.bank,
        account: request.account,
        alias_name: request.alias_name,
        email: request.email,
        masjid_id: purpose.masjid_id,
        purpose: purpose.name,
        image: imagePath
      }
    });
    
    if(saveAccount) {
      return {
        message: "Berhasil menambahkan rekening bank!",
        status: 200
      }
    } else {
      return {
        message: "Gagal menambahkan rekening bank. Coba lagi",
        status: 500
      }
    }
  } else {
    return {
      message: "Gagal menambahkan rekening bank. Coba lagi",
      status: 500
    }
  }
}

const getAccount = async (request) => {
  request = validate(accountBankValidation.getPurposeSchema, request);

  const masjid_id = await mosqueServices.getMasjidId(request);
  if(masjid_id.status) {
    return masjid_id;
  }

  const accountBank = await prismaClient.accountBank.findMany({
    where: {
      masjid_id: masjid_id
    },
    select: {
      id: true,
      name: true,
      bank: true,
      account: true,
      alias_name: true,
      email: true,
      purpose: true,
      image: true
    }
  });

  if(accountBank) {
    return {
      message: "Daftar rekening bank berhasil didapatkan!",
      status: 200,
      account_bank: accountBank
    };
  } else {
    return {
      message: "Daftar rekening bank gagal didapatkan!",
      status: 500
    };
  }
}

const getAccountWithHashedMasjidID = async (request) => {
  request = validate(accountBankValidation.getPurposeSchema, request);
  const masjid_id = await mosqueServices.changeTokenToMasjidId(request);

  if(!masjid_id) {
    return {
      status: 400,
      message: "Akses illegal"
    };
  }

  const donations = await prismaClient.accountBank.findMany({
    where: {
      masjid_id: masjid_id
    },
    select: {
      id: true,
      purpose: true
    }
  });

  if(donations) {
    const donationsData = donations.map((value) => {
      const {id, ...rest} = value;
      return {
        ...rest,
        id: jwt.sign(String(id), process.env.SECRET_KEY)
      }
    });
    return {
      donations: donationsData,
      message: "Daftar Donasi berhasil didapatkan!",
      status: 200
    }
  } else {
    return {
      message: "Daftar donasi gagal didapatkan!",
      status: 500
    }
  }
}

const getDetailAccount = async (request) => {
  request = validate(accountBankValidation.getPurposeSchema, request);
  const accountID = await mosqueServices.changeTokenToMasjidId(request);

  if(!accountID) {
    return {
      status: 400,
      message: "Akses illegal"
    };
  }

  const accountBank = await prismaClient.accountBank.findFirst({
    where: {
      id: accountID
    },
    select: {
      name: true,
      image: true,
      bank: true,
      account: true,
      alias_name: true,
      purpose: true
    }
  });  

  if(accountBank) {
    return {
      account: accountBank,
      message: "Rekening Donasi berhasil didapatkan!",
      status: 200
    }
  } else {
    return {
      message: "Rekening donasi gagal didapatkan!",
      status: 500
    }
  }
}

const saveDonation = async (request, requestFiles) => {
  request = validate(accountBankValidation.saveDonationSchema, request);
  const masjidId = await mosqueServices.changeTokenToMasjidId(request.masjid_id);
  const donationId = await mosqueServices.changeTokenToMasjidId(request.donation_id);
  if(!masjidId && !donationId) {
    return {
      status: 400,
      message: "Akses illegal"
    };
  }

  const imagePath = requestFiles?.image ? path.join('donations/images', requestFiles.image[0].filename) : "";

  const type = await prismaClient.accountBank.findFirst({
    where: {
      id: donationId
    }
  });

  const save = await prismaClient.donation.create({
    data: {
      image: imagePath,
      name: request.name,
      masjid_id: masjidId,
      verified: false,
      amount: Number(request.amount),
      type: type.purpose
    }
  })
}

export default {
  createPurpose,
  getPurpose,
  createAccount,
  getAccount,
  getAccountWithHashedMasjidID,
  getDetailAccount,
  saveDonation
}