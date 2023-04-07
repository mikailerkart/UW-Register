const { Client, GatewayIntentBits, Routes, EmbedBuilder, Collection, ActivityType } = require("discord.js");
const config = require("./config.json");
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require("@discordjs/rest")
const db = require("croxydb");

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();
const slashCommands = []

client.once("ready", () => {
    console.log(`${client.user.username} is online.`);

    let guildId = config.guildID;
    let clientId = config.clientID;
    let token = process.env.token;

    const rest = new REST({version: 10}).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands })
	    .then(() => console.log('Successfully registered application commands.'))
	    .catch(console.error); 

    const optionsPresence = [
        {
            type: ActivityType.Playing,
            name: "Underworld",
            status: "online",
            url: "https://discord.gg/SNXdvsstGR"
        },
        {
            type: ActivityType.Streaming,
            name: "Mikail <3",
            status: "online",
            url: "https://www.twitch.tv/mikailyone"
        },
        {
            type: ActivityType.Listening,
            name: "Ahmet Kaya - Yorgun Demokrat",
            status: "online",
            url: "https://open.spotify.com/track/1ffexZp7QsAa3R04gd6W2A?si=9bedda9622a14407"
        }
    ];

    setInterval(function() {

        let optionNumber = Math.floor(Math.random()* optionsPresence.length);

        client.user.setPresence({
            activities: [{name: optionsPresence[optionNumber].name, type: optionsPresence[optionNumber].type, url: optionsPresence[optionNumber].url }],
            status: optionsPresence[optionNumber].status
        })

    }, 60 * 1000);


});

const commandsPath = path.join(__dirname, 'slashCommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	client.commands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());

    console.log(`De file ${command.data.name}.js is geladen`);
}


client.on('guildMemberAdd', async (member) => {

    let staffRole = member.guild.roles.cache.find(r => r.name.toLowerCase() == "register staff");

    var embed = new EmbedBuilder()
        .setTitle("**Bir üye aramıza katıldı.**")
        .setDescription(`${member} **Sunucumuza hoş geldiniz.**\n\n**Kayıt olmak için ${staffRole} rolündeki yetkilileri etiketlemeyi unutma.**`)
        .setColor("#FFFFFF")
        .setTimestamp()

    member.guild.channels.cache.find(c => c.name.toLowerCase() == "register-chat").send({ content: `${staffRole} ${member}`, embeds: [embed] }); // register chat

    let role = member.guild.roles.cache.find(r => r.name.toLowerCase() == "unregister"); // unregister role

    if (!role) return;

    member.roles.add(role)
    member.setNickname("◑ Kayıtsız")

});


client.on('interactionCreate', async (interaction) => {

    const command = client.commands.get(interaction.commandName);

	if (!command) return;
	
	    try {
		    await command.execute(client, interaction);
	    } catch (error) {
		    console.error(error);
		    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

});


client.login(process.env.token);