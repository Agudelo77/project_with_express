const express = require('express');
const usersServices = require('../services/users.services');

const router = express.Router();

const service = new usersServices();

// router.get('/', (req, res) => {
//   const { limit, offset } = req.query;
//   if(limit && offset){
//     res.json({
//     limit,
//     offset
//   });
//   } else {
//     res.send('No hay parametros');
//   }
// });

router.get('/', async (req, res) =>{
  const users = await service.find();
  res.json(users);
  // const limit = 10;
  // const users = [];
  // for(let i = 0; i < limit; i++){
  //   users.push({
  //     id: faker.datatype.uuid(),
  //     name: faker.person.fullName(),
  //   });
  // }
  // res.json(users);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
  // const { id } = req.params;
  // const user = await service.findOne(id);
  // res.json(user);
  // const { id } = req.params;
  // res.json({
  //   id
  // });
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
  // const body = req.body;
  // res.status(201).json({
  //   message: 'created',
  //   data: body,
  // });
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateUser = await service.update(id, body);
    res.json(updateUser);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
  // const { id } = req.params;
  // const body = req.body;
  // const updateUser = service.update(id, body);
  // res.json(updateUser);
  // const { id } = req.params;
  // res.json({
  //   message: 'update',
  //   id,
  // });
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await service.delete(id);
    res.json(deleteUser);
  } catch (error) {
    res.json({
      message: error.message
    });
  }
  // const { id } = req.params;
  // const deleteUser = service.delete(id);
  // res.json(deleteUser);
  // const { id } = req.params;
  // res.json({
  //   message: 'delete',
  //   id,
  // });
});

module.exports = router;
