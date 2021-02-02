const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    Login: {type: String},
    Password: {type: String},
    filter:{type: String},
    tasks: [{type: Types.ObjectId, ref: 'Task'}]
});

module.exports = model('User', schema);