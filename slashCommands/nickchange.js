const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	category: "moderation",
	data: new SlashCommandBuilder()
		.setName('nickchange')
		.setDescription('Nick değiştirme')
        .addUserOption(option =>
            option.setName('user')
                .setDescription("Bir kullancı belirtin")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('isim')
                .setDescription('isim gir')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('yaş')
                .setDescription('yaş gir')
                .setRequired(true)),
	async execute(client, interaction) {
		
        let role = await interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "register staff")

        if (!interaction.member.roles.cache.has('944700546017804363')) return interaction.reply({ content: "Sen nick değiştiremezsin.", ephemeral: true});

        if (member.roles.cache.has(role.id)) return interaction.reply("Bu kişi'nin nickini değiştiremezsin.");

        let member = await interaction.options.getMember("user");

        const isim = await interaction.options.getString("isim");
        const yaş = await interaction.options.getString("yaş");

        member.setNickname(`⌁ ${isim} | ${yaş}`)

        await interaction.reply({content: "Nick başarıyla değiştirildi.", ephemeral: true});

	},
};