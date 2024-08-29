//discord.gg/lunatix && laschebest
const Client = require('../Utilities/Helpers/lasche.clients.js')
const { Main: { token, Database: { MongoDB, MongoURI } } } = require('../Utilities/Settings/config.js');
const client = global.client = new Client(
    { token: token }
);
if (MongoDB == true) {
    client.connect({ type: "MongoDB", url: MongoURI });
} else {
    client.connect(); 
};
client.readEventFiles();
client.readCommandFiles(slash = true, text = true)