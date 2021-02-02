const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    taskValue: {type: String},
    checks: {type: Boolean},
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Task', schema);