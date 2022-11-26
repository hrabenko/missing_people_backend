import PostModel from '../models/Post.js'
import { validationResult } from 'express-validator';

export const create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const doc = new PostModel({
            fullName: req.body.fullName,
            birthDate: req.body.birthDate,
            city: req.body.city,
            appearanceDescription: req.body.appearanceDescription,
            phoneNumber: req.body.phoneNumber,
            photoUrl: req.body.photoUrl,
            user: req.userId,
        })

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не владося створити публікацію',
        });
    }
}