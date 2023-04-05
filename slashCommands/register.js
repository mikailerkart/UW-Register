const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType } = require('discord.js');
const discord = require('discord.js');

module.exports = {
	category: "moderation",
	data: new SlashCommandBuilder()
		.setName('kayıt')
		.setDescription('Yeni üye kayıt eder.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription("Bir kullancı belirtin")
                .setRequired(true)),
	async execute(client, interaction) {

        if (!interaction.member.roles.cache.has('944700546017804363')) return interaction.reply({ content: "Sen kayıt edemezsin.", ephemeral: true});

        let member = await interaction.options.getMember("user");

        if(member.roles.cache.has('989554161131618414')) return interaction.reply({ content: "Bu üye zaten public olarak kayıtlı", ephemeral: true });

        var embed = new EmbedBuilder()
        .setTitle("**Üye kayıt etme**")
        .setDescription(`${member} kayıt etme üzeresin, button a tıklayarak kayıt edebilirsin.`)
        .setColor("#FFFFFF")
        .setTimestamp()

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("erkek")
                .setLabel("Erkek")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("kız")
                .setLabel("Kız")
                .setStyle(ButtonStyle.Danger)

        );

        const filter = (interactionReply) =>{
            if (interactionReply.user.id === interaction.user.id) return true;
        }

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 15000,
            componentType: ComponentType.Button
        });


        await interaction.reply({ components: [row], embeds: [embed], ephemeral: true })

        collector.on("collect", async (interactionButton) => {

            let id = interactionButton.customId

            switch(id){
                case "erkek":
    
                    const erkekModal = new ModalBuilder()
                        .setTitle('Erkek kayıt')
                        .setCustomId('eModal')
    
                    const enick = new TextInputBuilder()
                        .setCustomId('eisim')
                        .setLabel('isim nedir?')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(2)
                        .setPlaceholder('Mikail')
                        .setRequired(true);
    
                    const eage = new TextInputBuilder()
                        .setCustomId('eyaş')
                        .setLabel('yaş nedir?')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(1)
                        .setPlaceholder('22')
                        .setRequired(true);
                
                const efirstActionRow = new ActionRowBuilder().addComponents(enick);
                const esecondActionRow = new ActionRowBuilder().addComponents(eage);
    
                erkekModal.addComponents(efirstActionRow, esecondActionRow);
                
                await interactionButton.showModal(erkekModal);
                break;
    
                case "kız":
                    const kızModal = new ModalBuilder()
                        .setTitle('Kız kayıt')
                        .setCustomId('kModal')
    
                    const knick = new TextInputBuilder()
                        .setCustomId('kisim')
                        .setLabel('isim nedir?')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(2)
                        .setPlaceholder('Sena')
                        .setRequired(true);
                    const kage = new TextInputBuilder()
                        .setCustomId('kyaş')
                        .setLabel('yaş nedir?')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(1)
                        .setPlaceholder('19')
                        .setRequired(true);
            
                const kfirstActionRow = new ActionRowBuilder().addComponents(knick);
                const ksecondActionRow = new ActionRowBuilder().addComponents(kage);
    
                kızModal.addComponents(kfirstActionRow, ksecondActionRow);
            
                await interactionButton.showModal(kızModal);
                break;
    
            };
        
    
        })

            let collectorv1 = new discord.InteractionCollector(client,{
                filter,
                time: 15000,
                interactionType: discord.InteractionType.ModalSubmit
            });

            collectorv1.on("collect", async (interactionModal) => {
            
            let modalID = interactionModal.customId

            let üyerol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "üye");
            let erkekrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "xy");
            let kızrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "xx");
            let unregisterrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "unregister");
    
            if (modalID === 'eModal'){
    
                const eisim = interactionModal.fields.getTextInputValue('eisim');
                const eyaş = interactionModal.fields.getTextInputValue('eyaş');
                
                member.roles.add(üyerol);
                member.roles.add(erkekrol);
                member.roles.remove(unregisterrol);
                member.setNickname(`${eisim} | ${eyaş}`);

                var eembed = new EmbedBuilder()
                    .setTitle(`Kayıt yapıldı`)
                    .setDescription(`Kullanıcı: ${member}\nİsim ve Yaş: ${eisim} ${eyaş}\nYetkili: ${interaction.member}\nCinsiyet: ${erkekrol}`)
                    .setColor('#007fff')
                    .setTimestamp()


                await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-chat").send(`${member} Sunucumuza hoş geldin <3.`)

                await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [eembed]})

                await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})
                    
            }else if(modalID === 'kModal'){
    
                const kisim = interactionModal.fields.getTextInputValue('kisim');
                const kyaş = interactionModal.fields.getTextInputValue('kyaş');
    
                member.roles.add(üyerol);
                member.roles.add(kızrol);
                member.roles.remove(unregisterrol);
                member.setNickname(`${kisim} | ${kyaş}`);

                var kembed = new EmbedBuilder()
                .setTitle(`Kayıt yapıldı`)
                .setDescription(`Kullanıcı: ${member}\nİsim ve Yaş: ${kisim} ${kyaş}\nYetkili: ${interaction.member}\nCinsiyet: ${kızrol}`)
                .setColor('#007fff')
                .setTimestamp()

                await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-chat").send(`${member} Sunucumuza hoş geldin <3.`)

                await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [kembed]})

                await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})
    
            }
        });

    },
};