import mongoose from "mongoose";

const conexionDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log('MongoDB conected in:', url);
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

export default conexionDB;