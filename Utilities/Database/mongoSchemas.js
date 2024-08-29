//discord.gg/lunatix && laschebest
const { Model, Schema } = require('mongoose');

const ExampleModel = new Model('Example', new Schema({
    name: String,
    age: Number
}));

module.exports = {
    ExampleModel,
    //. . .
}