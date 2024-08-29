//discord.gg/lunatix && laschebest
const { ShardingManager } = require('discord.js');
const { Main: { token } } = require('../Utilities/Settings/config.js');
const path = require('path');
const manager = new ShardingManager(path.join(__dirname, '/index.js'), {
    token: token,
    totalShards: "auto",
});

manager.on('shardCreate', (shard) => {
    console.log(`Launched shard ${shard.id}`);
});

manager.spawn();
