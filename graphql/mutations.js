const { GraphQLString, GraphQLID } = require("graphql");
const { User, Post } = require("../models");
const { createJWT } = require("../util/auth");
const { PostType } = require("./types");

const register = {
    type: GraphQLString,
    description: "Register a new user and return a JWT token",
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
    },
    async resolve(parents, args) {
        const { name, email, password, displayName, phoneNumber } = args;
        const user = new User({ name, email, password, displayName, phoneNumber });
        await user.save();
        const token = createJWT({ userId: user._id, email: user.email, displayName: user.displayName, name: user.name, phoneNumber: user.phoneNumber });
        return token;
    },
};

const login = {
    type: GraphQLString,
    description: "Login a user and return a JWT token",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parents, args) {
        const { email, password } = args;
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            throw new Error("User not found");
        }
        const isEqual = args.password === user.password;
        if (!isEqual) {
            throw new Error("Password is incorrect");
        }
        const token = createJWT({ userId: user._id, email: user.email, displayName: user.displayName, name: user.name, phoneNumber: user.phoneNumber });
        return token;
    },
};

const updateUser = {
    type: GraphQLString,
    description: "Update a user and return a JWT token",
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
    },
    async resolve(parents, args) {
        const { id, name, email, password, displayName, phoneNumber } = args;
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        if (displayName) {
            user.displayName = displayName;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        await user.save();
        const token = createJWT({ userId: user._id, email: user.email, displayName: user.displayName, name: user.name, phoneNumber: user.phoneNumber });
        return token;
    },
};

const createPost = {
    type: PostType,
    description: "Create a new post",
    args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        city: { type: GraphQLString },
    },
    async resolve(parents, args, { verifiedUser }) {
        const newPost = new Post({
            title: args.title,
            content: args.content,
            city: args.city,
            authorId: verifiedUser.userId,
        })
        await newPost.save();
        return newPost;
    },
};

const updatePost = {
    type: PostType,
    description: "Update a post",
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        city: { type: GraphQLString },
    },
    async resolve(parents, args, { verifiedUser }) {
        const post = await Post.findById(args.id);
        if (!post) {
            throw new Error("Post not found");
        }
        if (post.authorId.toString() !== verifiedUser.userId) {
            throw new Error("You are not authorized to edit this post");
        }
        const updatedPost = await Post.findByIdAndUpdate(args.id, {
            title: args.title,
            content: args.content,
            city: args.city,
        }, { new: true });
        return updatedPost;
    },
};

const deletePost = {
    type: PostType,
    description: "Delete a post",
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parents, args, { verifiedUser }) {
        const post = await Post.findById(args.id);
        if (!post) {
            throw new Error("Post not found");
        }
        if (post.authorId.toString() !== verifiedUser.userId) {
            throw new Error("You are not authorized to delete this post");
        }
        await Post.findByIdAndDelete(args.id);
        return post;
    },
};


module.exports = { register, login, createPost, updatePost };