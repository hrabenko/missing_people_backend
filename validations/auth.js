import { body } from 'express-validator';

export const registerValidation = [
    body('email', "Incorrect mail").isEmail(),
    body('password', "Mininum 5 symbols").isLength({ min: 5 }),
    body('fullName', "Mininum 3 symbols").isLength({ min: 3 }),
    body('avatarUrl', "Incorrect url").optional().isURL(),
];

