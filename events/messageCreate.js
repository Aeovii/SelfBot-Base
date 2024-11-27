const config = require('../config.json')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (!message.content.startsWith(config.prefix)) return;

        // Extract the command name
        const args = message.content.slice(config.prefix.length).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();

        console.log(commandName);

        const command = client.commands.get(commandName);

        if (!command) return;

        // If any condition is true, continue
        if (!(message.author.id == client.user.id || 
            command.whitelistedUsers.includes(message.author.id) || 
            command.whitelistedChannels.includes(message.channel.id) ||
            command.whitelistedGuilds.includes(message.guild.id))) return;

        try {
            // Execute the command and pass necessary arguments
            await command.execute(message, client, args);
        } catch (error) {
            console.error(`Error executing command '${commandName}':`, error);
            message.channel.send(`An error occurred while executing the command.\n\`\`\`\n${error}\n\`\`\``);
        }
    },
};