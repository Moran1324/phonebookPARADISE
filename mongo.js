const mongoose = require('mongoose')
require('dotenv').config()

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

const name = process.argv[2]
const number = process.argv[3]
const password = process.env.MONGO_PASS;

const url =
  `mongodb+srv://phonebook_fullstack:${password}@cluster0.swwah.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// make persons like in server and dend them to database.
const person = new Person({
  name: name,
  number: number
})

if (person.name === undefined && person.number === undefined) {
  Person.find({}).then(result => {
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
} else {
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)


// const note = new Note({
//   content: 'HTML is Easy, MongoDB is Also 4',
//   date: new Date(),
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })