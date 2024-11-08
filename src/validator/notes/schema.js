const Joi = require('joi');
const joi = require('joi');

const NotePayloadSchema = joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
});

module.exports = { NotePayloadSchema };