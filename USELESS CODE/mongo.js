const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/Login_Register")

.then(()=>{
    console.log('mongodb connected');
})
.catch(()=>{
    console.log('error')
})

const Data_Schema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }

})

const collection = new mongoose.model('Registration_Data',Data_Schema)

data=[
    { 
        username: "nishtha",
        password: "1234"
    },
    {
        username: "Tommy",
        password: "9876"
    }

]

collection.insertMany(data)