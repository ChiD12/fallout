import { celebrate, Joi, errors, Segments } from 'celebrate'

export const vaultMemberSchema = Joi.object().keys({
    "name": Joi.string().trim().required(),
    "eye-color": Joi.string().trim().required(),
    "hair-color": Joi.string().trim().required(),
    "age": Joi.number().required(),
    "deceased": Joi.number(),
    "mother": Joi.string().trim(),
    "father": Joi.string().trim()
})

