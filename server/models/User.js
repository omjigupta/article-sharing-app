const mongoose = require('mongoose')
const validator = require('validator')

let UserSchema = new mongoose.Schema(
    {
        name: String,
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          validate: (value) => {
            return validator.isEmail(value)
          }
        },
        provider: String,
        provider_id: String,
        token: String,
        provider_pic: String,
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

UserSchema.methods.follow = function (user_id) {
    if (this.following.indexOf(user_id) === -1) {
        this.following.push(user_id)
    }
    return this.save()
}

UserSchema.methods.addFollower = function (fs) {
    this.followers.push(fs)
}

module.exports = mongoose.model('User', UserSchema)
