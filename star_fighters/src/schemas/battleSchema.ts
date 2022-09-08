import joi, { ObjectSchema } from 'joi';

const battleSchema: ObjectSchema = joi.object({
    firstUser: joi.string().required(),
    secondUser: joi.string().required().disallow(joi.ref('firstUser'))
});

export default battleSchema;