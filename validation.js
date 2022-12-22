import { body } from 'express-validator';

export const registerValidation = [
    body('email', "Некоректний формат пошти").isEmail(),
    body('password', "Довжина паролю повинна бути мінімум 8 символів").isLength({ min: 8 }),
    body('fullName', "Довжина імені повинна бути мінімум 2 символи").isLength({ min: 2 }),
    body('avatarUrl', "Некоректне посилання на фото").optional().isURL(),
];

export const loginValidation = [
    body('email', "Некоректний формат пошти").isEmail(),
    body('password', "Довжина паролю повинна бути мінімум 8 символів").isLength({ min: 8 }),
];

export const postCreateValidation = [
    body('fullName', "Довжина імені повинна бути мінімум 2 символи").isLength({ min: 2 }),
    body('birthDate', "Некоректно введенна дата").isDate(),
    body('cities', "Некоректний формат").optional().isString(),
    body('appearanceDescription', "Опис зовнішності повиннен бути мінімум 8 символів").isLength({ min: 8 }).isString(),
    body('phoneNumber', "Некоректно введений номер телефону").isMobilePhone(),
    body('photoUrl', "Некоректне посилання на фото").optional().isString(),
];