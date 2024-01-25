const { faker } = require('@faker-js/faker');

class usersServices {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 7;
    for(let i = 0; i < limit; i++){
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.person.fullName(),
      });
    }
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find(){
   return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 1000);
    });
  }

  async findOne(id){
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error('user not found');
    }
    return this.users[index];
  }

  async update(id, changes) {
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error('user not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    }
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error('user not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = usersServices;
