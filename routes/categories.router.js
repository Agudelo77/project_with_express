const express = require('express');

const categoriesService = require('../services/categories.services');

const router = express.Router();
const service = new categoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
  // const limit = 20;
  // const products = [];
  // for(let i = 0; i < limit; i++){
  //   products.push({
  //     id: faker.datatype.uuid(),
  //     name: faker.commerce.productName(),
  //   });
  // }
  // res.json(products);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
  // const { id } = req.params;
  // const category = await service.findOne(id);
  // res.json(category);
  // const { id } = req.params;
  // res.json({
  //   id
  // });
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
  // const body = req.body;
  // res.json({
  //   message: 'created',
  //   data: body,
  // });
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateCategory = await service.update(id, body);
    res.json(updateCategory);
  } catch (error) {
    next(error);
    // res.status(404).json({
    //   message: error.message
    // });
  }
  // const { id } = req.params;
  // const body = req.body;
  // const updateCategory = await service.update(id, body);
  // res.json(updateCategory);
  // const { id } = req.params;
  // const body = req.body;
  // res.json({
  //   message: 'update category',
  //   data: body,
  //   id,
  // });
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCategory = await service.delete(id);
    res.json(deleteCategory);
  } catch (error) {
    next(error);
  }
  // const { id } = req.params;
  // const deleteCategory = await service.delete(id);
  // res.json(deleteCategory);
  // const { id } = req.params;
  // res.json({
  //   mesagge: 'delete',
  //   id,
  // });
});

module.exports = router;
