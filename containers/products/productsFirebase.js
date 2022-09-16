const admin = require("firebase-admin");
const serviceAccount = require("../../coderh-test-firebase-adminsdk-2zh3u-31ff9c1784.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
dbQuery = db.collection('products')

class ProductsFirebase {
    constructor() {
    }

    async getAll() {
        try {
            let query = await dbQuery.get();
            let products = query.docs.map((prod) => prod.data());
            return products;
        } catch (error) {
            return error;
        }
    }

    async save(product) {
        try {
            let carritos = await dbQuery.add(product);
            return carritos;
        } catch (error) {
            return error;
        }
    }

    async deleteById(id) {
        try {
            await dbQuery.doc(id).delete();
            return;
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            let product = await dbQuery.get(id);
            return product;
        } catch (error) {
            return error;
        }
    }

    async updateById(id, product) {
        try {
            await dbQuery.doc(id).set(product);
            return;
        } catch (error) {
            return error;
        }
    }
}

module.exports = ProductsFirebase;
