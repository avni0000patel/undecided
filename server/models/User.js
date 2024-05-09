const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        match: [/.+@.+\..+/, 'Must match an email address!'],
        required: true,
        type: String,
        unique: true,
    },
    first_name: {
        required: true,
        type: String,
        trim: true,
        unique: false,
    },
    last_name: {
        required: true,
        type: String,
        trim: true,
        unique: false,
    },
    password: {
        minlength: 5,
        required: true,
        type: String,
    },
    profiles: [
        {
            ref: 'Profile',
            type: Schema.Types.ObjectId,
        },
    ],
    username: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
