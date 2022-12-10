const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Missing arguments. Make sure to provide at least the password.');
  process.exit(1);
}

const password = process.argv[2];
const new_name = process.argv[3];
const new_number = process.argv[4];

const url = `mongodb+srv://cicekmdb:${process.env.MONGO_PASSWORD}@fsocluster.nvdjura.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const entrySchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Entry = mongoose.model('Entry', entrySchema);
if (process.argv.length == 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected');

      const entry = new Entry({
        name: new_name,
        number: new_number,
      });

      return entry.save();
    })
    .then(() => {
      console.log(`Entry: ${new_name} ${new_number} added to the phonebook!`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else {
  mongoose.connect(url).then((result) => {
    console.log('connected');
    Entry.find({}).then((result) => {
      result.forEach((entry) => {
        console.log(entry);
      });
      mongoose.connection.close();
    });
  });
}
