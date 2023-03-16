const mongoose = require('mongoose');

const connectDB  = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // console.log("Mongo DB Connected =======>",conn.connection.host)
        console.log(`Mongo DB Connected =======>${conn.connection.host}`.cyan.underline)
        //The cyan is from the colors package
    }
    catch(e) {
        console.log("Mongo Error",e)
        process.exit(1)
    }
}

module.exports = connectDB