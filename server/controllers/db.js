const connectDB = require("../config/db");
const mongoose = require("mongoose");

exports.dbConnect = async (req, res) => {
    const { database } = req.body;

    await mongoose.disconnect();

    if (database === 'db1') {
        activeDB = process.env.MONGO_URI_1;
    } else if (database === 'db2') {
        activeDB = process.env.MONGO_URI_2;
    } else if (database === 'db3') {
        activeDB = process.env.MONGO_URI_3;
    } else if (database === 'db4') {
        activeDB = process.env.MONGO_URI_4;
    } else if (database === 'db5') {
        activeDB = process.env.MONGO_URI_5;
    }

    try {
        await mongoose.connect("mongodb+srv://minh210801:210801@cluster-test-wnb.ia5floh.mongodb.net/new_database?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connection SUCCESS");
        console.log(`Switched to ${database}`);
        res.json(database);
    } catch (error) {
        console.error("MongoDB connection FAIL");
        console.error(error);
        process.exit(1);
    }
}

exports.currentDB = async (req, res) => {
    const currentDB = mongoose.connection.name;
    const currentDBURI = mongoose.connection.client.s.url;

    return res.json({
        currentDB,
        currentDBURI,
    });
} 
