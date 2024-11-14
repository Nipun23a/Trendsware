const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    first_name: {type:String,required:true},
    last_name : {type: String,required:true},
    email : {type: String,required: true},
    image_url : {type:String,required:true},
    password : {type: String, required : true},
    is_active : {type:Boolean, default:true},
    user_role : {type: String, enum : ['admin','customer','worker']}
}, { timestamps:true });


// Password Hashing Process
UserSchema.pre('save',async function (next) {
    try {
        if(!this.isModified('password')){
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})


// Method to Compare the provided password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
}

const User = mongoose.model('User',UserSchema);
module.exports = User;