const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:String,
    complete:Boolean
})

module.exports = mongoose.model('Task', )