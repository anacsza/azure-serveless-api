const { ObjectID } = require('mongodb');
const createMongoCliente = require('../shared/MongoClient');

module.exports = async function (context, req) {
    const { id } = req.params;
    const product = req.body;
    const { client: MongoClient, closeConnectionFn } = await createMongoCliente();
    const Products = MongoClient.collection('products');
    const res = await Products.findOneAndUpdate({ _id: ObjectID(id) }, { $set: product });
    closeConnectionFn();
    context.res = {
        status: 200,
        body: res
    }
}