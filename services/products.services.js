const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

class servicesProducts{

  constructor() {
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 5;
    for(let i = 0; i < limit; i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.image(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block');
    }
    return product;
    // const name = this.getTotal();
  //   const index = this.products.findIndex(item => item.id === id);
  //   if(index === -1){
  //     throw boom.notFound('product not found');
  //     // throw new Error('product not found');
  //   }
  //   if(index.isBlock){
  //     throw boom.conflict('product is block');
  //   }
  //   return this.products[index];
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('product not found');
      // throw new Error('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('product not found');
      // throw new Error('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
};

module.exports = servicesProducts;
