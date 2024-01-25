const { faker } = require('@faker-js/faker');

class categoriesService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for(let i = 0; i < limit; i++){
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 1500);
    });
    // return this.categories;
  }

  async findOne(id) {
    const index = this.categories.findIndex(cat => cat.id === id);
    if(index === -1) {
      throw new Error('product not found');
    }
    return this.categories[index];
  }

  async update(id, changes) {
    const index = this.categories.findIndex(cat => cat.id === id);
    if(index === -1){
      throw new Error('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(cat => cat.id === id);
    if(index === -1) {
      throw new Error('product not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
};

module.exports = categoriesService;
