
const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const PatientSchema = new Schema({


   
    name : {
        type : String,
        required: true
    },     
    age:{
        type: Number,
        require: true
    },
    gender:{
        type: String,
        required: true

    },
    adress:{
        type: String,
        required: true
    },
    disease:{
        type: String,
        required: true
    },
    contac:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const pateint = mongoose.model("pateint",PatientSchema);

module.exports =pateint;