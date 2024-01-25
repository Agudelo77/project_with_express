const express = require('express');

const servicesProducts = require('../services/products.services');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');
// const { faker } = require('@faker-js/faker');

const router = express.Router();
const service = new servicesProducts();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
  // const products = [];
  // const { size } = req.query;
  // const limit = size || 10;
  // for(let i = 0; i < limit; i++){
  //   products.push({
  //     id: faker.datatype.uuid(),
  //     name: faker.commerce.productName(),
  //     price: parseInt(faker.commerce.price(), 10),
  //     image: faker.image.imageUrl()
  //   })
  // }
  // res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
    // res.json({
    //   message: error.message,
    // });
  }
  // const { id } = req.params;
  // const product = await service.findOne(id);
  // res.json(product);
  // const { id } = req.params;
  // res.json({
  //   id,
  // });
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
  // const body = req.body;
  // res.json({
  //   message: 'created',
  //   data: body
  // });
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateProduct = await service.update(id, body);
    res.json(updateProduct);
  } catch (error) {
    next(error);
    // res.json({
    //   message: error.message
    // });
  }
  // const { id } = req.params;
  // const body = req.body;
  // const updateProduct = await service.update(id, body);
  // res.json(updateProduct);
  // const { id } = req.params;
  // const body = req.body;
  // res.json({
  //   message: 'update',
  //   data: body,
  //   id,
  // });
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await service.delete(id);
    res.json(deleteProduct);
  } catch (error) {
    next(error);
    // res.json({
    //   message: error.message
    // });
  }
  // const { id } = req.params;
  // const deleteProduct = await service.delete(id);
  // res.json(deleteProduct);
  // const { id } = req.params;
  // res.json({
  //   message: 'delete',
  //   id,
  // });
});

module.exports = router;
