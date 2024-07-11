import mongoose from "mongoose";
import config from "./config.js";

const connection = async () => {
    try {
        await mongoose.connect(config.db.cs);
        console.info("MongoDb - established connection");
    } catch (e) {
        console.error("Error: ", e);
    }
}

export default connection;