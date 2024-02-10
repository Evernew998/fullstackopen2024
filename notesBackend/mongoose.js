const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@clusternotes.dknferp.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Getting a job is hard',
  important: true,
})


note.save().then(result => {
  console.log('note saved!')
  console.log(result)
  mongoose.connection.close()
})

/*
Note.find({ content: 'Getting a job is hard' }).then((result) => {
  console.log(result)
  mongoose.connection.close()
})
*/
