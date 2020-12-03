const schema = require('./schema');
const validator = require('./validate');

const result = validator.validate(schema, { requiredProps: '', control: '' });
result.errors.map((err) => console.log('message: ', err.message));
// console.log(result.errors);
