const { AuthenticationError } = require('apollo-server-express');
const { User, Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        profile: async (parent, { profileId }) => {
            return Profile.findOne({ _id: profileId });
        },
        profiles: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Profile.find(params);
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        users: async () => {
            return User.find();
        },
    },

    Mutation: {
        addUser: async (parent, { email, first_name, last_name, password, username }) => {
            const user = await User.create({ email, first_name, last_name, password, username });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addProfile: async (parent, { bio, email, facebook, image, instagram, linkedin, location, name, phoneNumber, pinterest, twitter }, context) => {
            if (context.user) {
                const profile = await Profile.create({
                    bio,
                    email,
                    facebook,
                    image,
                    instagram,
                    linkedin,
                    location,
                    name,
                    phoneNumber,
                    pinterest,
                    twitter,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { profiles: profile._id } }
                );

                return profile;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeProfile: async (parent, { profileId }, context) => {
            if (context.user) {
                const profile = await Profile.findOneAndDelete({
                    _id: profileId,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { profiles: profile._id } }
                );

                return profile;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
