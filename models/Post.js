import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true,
    },
    birthDate: {
        type: String, 
        required: true,
    },
    cities: {
        type: Array, 
        required: true,
        default: []
    },
    appearanceDescription: {
        type: String, 
        required: true,
    },
    phoneNumber: {
        type: String, 
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    photoUrl: String,
}, {
    timestamps: true,
});

export default mongoose.model('Post', PostSchema);