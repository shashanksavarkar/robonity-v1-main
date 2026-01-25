import Joi from 'joi';

// Register Schema
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Name must be a string.',
        'string.empty': 'Name cannot be empty.',
        'string.min': 'Name must be at least 3 characters long.',
        'any.required': 'Name is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long.',
        'any.required': 'Password is required.'
    })
});

// Login Schema
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required.'
    })
});

// Validation Middleware
export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({
            error: 'Validation Error',
            details: errorMessages
        });
    }
    next();
};

export const validateRegister = validate(registerSchema);
export const validateLogin = validate(loginSchema);
