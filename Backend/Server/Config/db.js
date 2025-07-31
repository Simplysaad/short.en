import { set, connect } from "mongoose";
const connectDb = async () => {
    try {
        set("strictQuery", false);
        let conn = await connect(process.env.MONGO_URI);
        if (!conn) throw new Error("connection failed");
        console.log(`MongoDB connected to ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
    }
};

export default connectDb;
