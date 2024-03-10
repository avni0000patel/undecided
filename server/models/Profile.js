const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    image: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    twitter: {
        type: String
    },
    linkedin: {
        type: String
    },
    instagram: {
        type: String
    }
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
