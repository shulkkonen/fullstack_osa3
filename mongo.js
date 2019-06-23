const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-bbkx4.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", phoneBookSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then(result => {
    result.forEach(element => {
      console.log(`${element.name} ${element.number}`);
    });
    mongoose.connection.close();
  });
}
if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const phoneBook = new Person({
    name: name,
    number: number
  });

  phoneBook.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
