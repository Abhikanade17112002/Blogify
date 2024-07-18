const moongose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    const connectionInstance = await moongose.connect(process.env.MONGODBURL);
    return connectionInstance;
  } catch (error) {
    console.log(" MONGO DB CONNECTION FAILED :: ERROR ", error);
    return;
  }
};

module.exports = connectToMongoDB;
