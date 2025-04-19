// import { prismaClient } from "../application/database.js";
// import { addAnimalSchema } from "../validation/qurban-validation.js";
// import { validate } from "../validation/validation.js";
// import mosqueServices from "./mosque-services.js";

// const addAnimal = async (request) => {
//   request = validate(addAnimalSchema, request);
//   console.log(request);
  
//   const masjidId = await mosqueServices.getMasjidId(request.user_id);
//   if(masjidId.status) {
//     return masjidId
//   }

//   const saveAnimal = await prismaClient.animal.create({
//     data: {
//       name: request.name,
//       weight: request.weight,
//       amount: request.amount
//     }
//   });

//   if(saveAnimal) {
//     const savePriceAnimal = await prismaClient.animalsQurban.create({
//       data: {
//         masjid_id: masjidId,
//         animal_id: saveAnimal.id,
//         price_per_kilo: request.price,
//       }
//     });

//     if(savePriceAnimal) {
//       return {
//         message: "Hewan berhasil didata.",
//         status: 200
//       }
//     } else {
//       return {
//         message: "Hewan gagal didata. Coba lagi",
//         status: 500
//       }
//     }
//   } else {
//     return {
//       message: "Hewan gagal didata. Coba lagi",
//       status: 500
//     }
//   }

// }

// export default {
  // addAnimal
// }