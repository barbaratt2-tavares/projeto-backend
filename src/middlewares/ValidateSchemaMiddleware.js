export const validateSchema = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.validate(req.body, { abortEarly: false });
        return next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};