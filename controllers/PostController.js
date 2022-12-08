import PostModel from '../models/Post.js'
import { validationResult } from 'express-validator';

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.cities).flat().slice(0, 5);

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не владося отримати теги',
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: 'Не владося отримати публікації',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOne({
            _id: postId
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                message: 'Не владося отримати публікацію',
            });
            }

            if (!doc) {
                return res.status(404).json({
                    message: "Публікацію не знайдено",
                })
            }

            res.json(doc);
        }
        )

    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: 'Не владося отримати публікацію',
        });
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Не владося видалити публікацію',
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: "Публікацію не знайдено",
                });
            }

            res.json({
                success: true,
            });
        })

    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: 'Не владося видалити публікацію',
        });
    }
}

export const create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const doc = new PostModel({
            fullName: req.body.fullName,
            birthDate: req.body.birthDate,
            cities: req.body.cities,
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

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        }, {
            fullName: req.body.fullName,
            birthDate: req.body.birthDate,
            cities: req.body.cities,
            appearanceDescription: req.body.appearanceDescription,
            phoneNumber: req.body.phoneNumber,
            photoUrl: req.body.photoUrl,
            user: req.userId,
        });

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не владося оновити публікацію',
        });
    }
}