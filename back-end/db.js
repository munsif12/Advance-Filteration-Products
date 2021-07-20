const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://Munsif___69:Munsif___69@cluster0.2gsyq.mongodb.net/mern_ecommerce_app?retryWrites=true&majority=ture",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log(`Connection to MongoDb Atlas Success`))
      .catch((error) => {
        console.error(`Connection to Db fail`);
        console.error(error);
        process.exit(1);
      });
  } catch (error) {
    console.error(`Connection to Db fail`);
    console.error(error);
    process.exit(1);
  }
};
module.exports = connection;
