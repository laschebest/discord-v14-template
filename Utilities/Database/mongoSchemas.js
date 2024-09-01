//discord.gg/lunatix && laschebest
const { model, Schema } = require('mongoose');

const ExampleSchema = new Schema({
    name: String,
    age: Number
});

new model('Example', ExampleSchema)

module.exports = {
    ExampleModel,
    //. . .
}
