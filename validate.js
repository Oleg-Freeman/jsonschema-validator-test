const Validator = require('jsonschema').Validator;
const ValidatorResult = require('jsonschema').ValidatorResult;

const validator = new Validator();

validator.attributes.requiredProps = function requiredProps(
    instance,
    schema,
    options,
    ctx
) {
    const rootProps = ['stepOrders', 'title', 'properties', 'type'];
    const props = ['description', 'type'];
    const result = new ValidatorResult(instance, schema, options, ctx);
    function checkProps(p, d) {
        if (!(p in d)) result.addError(`${p} is required property`, schema);
    }
    rootProps.map((e) => {
        checkProps(e, instance);
    });

    for (const el in instance.properties) {
        props.map((e) => {
            checkProps(e, instance.properties[el]);
        });
        for (const c in instance.properties[el].properties) {
            props.map((i) => {
                checkProps(i, instance.properties[el].properties[c]);
            });
        }
    }
    return result;
};
validator.attributes.control = function control(
    instance,
    schema,
    options,
    ctx
) {
    const result = new ValidatorResult(instance, schema, options, ctx);
    for (const el in instance.properties) {
        for (const c in instance.properties[el].properties) {
            const prop = instance.properties[el].properties[c];
            if (prop.control === 'toggle' && prop.type !== 'boolean')
                result.addError('Toggle must be boolean', schema);
        }
    }
    return result;
};
module.exports = validator;
