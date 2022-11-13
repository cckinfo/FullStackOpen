const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://cicekmdb:${password}@fsocluster.nvdjura.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const entrySchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Entry = mongoose.model('Entry', entrySchema);

mongoose.connect(url).then((result) => {
  console.log('connected');

  // const entry = new Entry({
  //   name: 'Fred',
  //   number: 9321,
  // });

  // return entry.save();
});
Entry.find({})
  .then((result) => {
    result.forEach((entry) => {
      console.log(entry);
    });
    mongoose.connection.close();
  })
  .then(() => {
    console.log('Entry saved!');
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
