const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    bio: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    instagram: {
        type: String
    },
    linkedin: {
        type: String
    },
    location: {
        type: String
    },
    name: {
        type: String
    },
    twitter: {
        type: String
    },
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
