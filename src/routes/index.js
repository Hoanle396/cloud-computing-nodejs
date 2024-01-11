var express = require("express");
const { Products } = require("../models");
const moment = require("moment-timezone");
const { REQUEST_TYPE, REMOTE_URL } = require("../constants");
const { logger } = require("../constants/logger");
const axios = require("axios");
const {upload, cloudUpload} = require("../constants/upload");
var router = express.Router();

// /**
//  * @openapi
//  * /create:
//  *  post:
//  *     tags:
//  *     - callback
//  *     description: Create new product
//  *     requestBody:
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             properties:
//  *               name:
//  *                 description: name
//  *                 type: string
//  *                 required: true
//  *               description:
//  *                 description: description
//  *                 type: string
//  *                 required: true
//  *               price:
//  *                 description: price
//  *                 type: number
//  *                 required: true
//  *               image:
//  *                 description: image
//  *                 type: string
//  *                 format: binary
//  *                 required: true
//  *             required: true
//  *     responses:
//  *       200:
//  *         description: created successfully
//  *       400:
//  *         description: requestId already exists
//  *       500:
//  *         description: server error
//  */
router.post("/create", cloudUpload.single('image'), async function (req, res, next) {
  const { name, description, price } = req.body;
  try {
    const data = await Products.create({ name, description, image:req.file.path, price });
    return res.status(200).json(data);
  } catch (error) {
    logger.error(error?.message);
    return res.status(400).json(error);
  }
});

/**
 * @openapi
 * /get-products:
 *  get:
 *     tags:
 *     - Products
 *     description: get list of products
 *     parameters:
 *     - in: query
 *       name: search
 *     responses:
 *       200:
 *         description: Get list success
 *       400:
 *         description: Invalid token
 */
router.get("/get-products", async function (req, res, next) {
  const { search } = req.query;
  const condition = {};
  if (search) {
    condition.name = { $regex: '.*' + search + '.*' };
  }
  try {
    const data = await Products.find(condition).select({ _id: 0, __v: 0 });
    if (data.length === 0) {
      return res.status(404).send({message: 'Product not found'});
    }
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message, error });
  }
});

module.exports = router;
