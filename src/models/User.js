const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "please add username"]
      },
    email: {
        type: String,
        required : [true, 'please add email'],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            ' please enter a valid email',
          ],
    },
    password : {
        type: String,
        require : [true, 'please add paasword']
    }

})


//encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  });

const User = mongoose.model('User', userSchema);

module.exports = User;