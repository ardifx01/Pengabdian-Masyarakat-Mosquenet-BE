import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  
  const admin = await prisma.admins.create({
    data: {
      status: false,
      role: 'Pengurus'
    }
  });
  
  const master = await prisma.masters.create({
    data: {
      status: true,
    }
  });
  
  const masjid = await prisma.masjids.create({
    data: {
      name: 'Mosquenet Developer',
      location: 'Jalan Teuku Nyak Arief',
      subdistrict_id: 2996,
      cityorregency_id: 112,
      province_id: 6,
      ward_id: 54583,
      verified: true
    }
  });

  const jamaah = await prisma.jamaahs.create({
    data: {
      masjid_id: masjid.id
    }
  });

  const saltPassword = process.env.ACCOUNT_PASSWORD + process.env.HASH_SALT;
  const hashPassword = await bcrypt.hash(saltPassword, Number(process.env.ROUND_SALT))

  await prisma.users.create({
    data: {
      name: "Admin Mosquenet",
      password: hashPassword,
      email: process.env.EMAIL_USER,
      telp: '081234567890',
      admin_id: admin.id,
      master_id: master.id,
      jamaah_id: jamaah.id,
      isVerified: true,
      isVerifiedByAdmin: true,
      tokenVerification: 'dkfhjaklddfjdfjldfjadkf'
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
