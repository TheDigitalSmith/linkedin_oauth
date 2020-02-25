const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    role: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: {
        type: String,
        maxlength:[500, 'Maximum 500 characters']
    },
    area: String,
    images:{
        type: String,
        default: "https://designshack.net/wp-content/uploads/placeholder-image.png"
    }
}, {timestamps: true})

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        maxlength: [250, 'Maximum 500 characters']
    }, 
    title:String,
    area: String,
    image:{
        type: String,
        default: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
    },
    experiences:[experienceSchema]
}, { timestamps: true})

const userCollection = mongoose.model('users', userSchema);
module.exports = userCollection;