// const Basic = require('../Model/basic');

// module.exports = {
// async createProduct (basic) {
//   let result = await Basic.create(basic);
//   if(result) {
//     return {
//       data: basic,
//       message: "Product successfully created!"
// };
//   }
// return "Error creating new product"
// },

// async getAllProduct()  {
//   let basic = await Basic.find();
//   if(basic)  return basic;
//   return "Error fetching products from db"
// },

// async getProductById(basicId)  {
//   let basic = await Basic.findOne(basicId);
//   if(basic) return basic;
//   return "Error fetching product from db";
// },
// };