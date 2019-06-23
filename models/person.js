const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = "mongodb+srv://fullstack:Cocacola89@cluster0-bbkx4.mongodb.net/phoneBook?retryWrites=true&w=majority";

console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
});

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

phoneBookSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", phoneBookSchema);
