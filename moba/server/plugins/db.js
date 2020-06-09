module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/moba',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    })

    require('require-all')(__dirname+'/../models')
}