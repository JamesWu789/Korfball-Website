const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = new Schema({

    provider: {
      type: String,
      required: true
    },
    specification: {
      type: String,
      required: true
    }
  })
  
module.exports = mongoose.model('Product', productsSchema)