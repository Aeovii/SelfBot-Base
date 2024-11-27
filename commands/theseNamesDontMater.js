module.exports = {
    name: 'hello',
    whitelistedUsers: ['1234'],
    whitelistedChannels: ['420'],
    whitelistedGuilds: ['69'],
    async execute(message, client) {
        await message.channel.send(`Hello to ${message.author.tag} from ${client.user.tag}!`);
    },
};