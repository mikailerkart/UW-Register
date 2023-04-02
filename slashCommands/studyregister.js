const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType } = require('discord.js');
const discord = require('discord.js');

module.exports = {
	category: "moderation",
	data: new SlashCommandBuilder()
		.setName('studykayıt')
		.setDescription('study e kayıt eder.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription("Bir kullancı belirtin")
                .setRequired(true)),
	async execute(client, interaction) {

        if (!interaction.member.roles.cache.has('944700546017804363')) return interaction.reply({ content: "Sen kayıt edemezsin.", ephemeral: true});

        let member = await interaction.options.getMember("user");

        if(member.roles.cache.has('887739414711791626')) return interaction.reply({ content: "Bu üye zaten student olarak kayıtlı", ephemeral: true });

        var embed = new EmbedBuilder()
        .setTitle("**Üye kayıt etme**")
        .setDescription(`${member} kayıt etme üzeresin, button a tıklayarak kayıt edebilirsin.`)
        .setColor("#FFFFFF")
        .setTimestamp()

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("türkerkek")
                .setLabel("Türk Erkek")
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("türkkız")
                .setLabel("Türk kız")
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("alienerkek")
                .setLabel("Alien Erkek")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("alienkız")
                .setLabel("Alien kız")
                .setStyle(ButtonStyle.Primary)
            
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
                case "türkerkek":
    
                    const teModal = new ModalBuilder()
                        .setTitle('Türk - Erkek kayıt')
                        .setCustomId('teModal')
    
                        const teedu = new TextInputBuilder()
                            .setCustomId('teedu')
                            .setLabel('9/10/11/12/mezun/üni')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(1)
                            .setPlaceholder('9')
                            .setRequired(true);
                
                const tefirstActionRow = new ActionRowBuilder().addComponents(teedu);
    
                teModal.addComponents(tefirstActionRow);
                
                await interactionButton.showModal(teModal);
                break;
    
                case "türkkız":
                    const tkModal = new ModalBuilder()
                        .setTitle('Türk - Kız kayıt')
                        .setCustomId('tkModal')
    
                        const tkedu = new TextInputBuilder()
                            .setCustomId('tkedu')
                            .setLabel('9/10/11/12/mezun/üni')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(1)
                            .setPlaceholder('9')
                            .setRequired(true);
            
                const tkfirstActionRow = new ActionRowBuilder().addComponents(tkedu);
    
                tkModal.addComponents(tkfirstActionRow);
            
                await interactionButton.showModal(tkModal);
                break;
                
                case "alienerkek":
                    const aeModal = new ModalBuilder()
                        .setTitle('Alien - Erkek kayıt')
                        .setCustomId('aeModal')

                        const aeedu = new TextInputBuilder()
                            .setLabel('9/10/11/12/üni')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(1)
                            .setPlaceholder('9')
                            .setRequired(true);
                
                const aefirstActionRow = new ActionRowBuilder().addComponents(aeedu);

                aeModal.addComponents(aefirstActionRow);

                await interactionButton.showModal(aeModal);
                break;

                case "alienkız":
                    const akModal = new ModalBuilder()
                        .setTitle('Alien - Kız kayıt')
                        .setCustomId('akModal')

                        const akedu = new TextInputBuilder()
                            .setLabel('9/10/11/12/üni')
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(1)
                            .setPlaceholder('9')
                            .setRequired(true);

                const akfirstActionRow = new ActionRowBuilder().addComponents(akedu);

                akModal.addComponents(akfirstActionRow);
                
                await interactionButton.showModal(akModal);
                    
            };
        
    
        })

            let collectorv1 = new discord.InteractionCollector(client,{
                filter,
                time: 15000,
                interactionType: discord.InteractionType.ModalSubmit
            });

            collectorv1.on("collect", async (interactionModal) => {
            
            let modalID = interactionModal.customId

            let türkrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "türk")
            let alienrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "alien")
            let studentrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "student");
            let dokuzrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "9. sınıf");
            let onrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "10. sınıf");
            let onbirrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "11. sınıf");
            let onikirrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "12. sınıf");
            let mezunrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "mezun");
            let ünirol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "lisans");
            let erkekrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "erkek");
            let kızrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "kız");
            let unregisterrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "unregister");
            let studyregisterrol = interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "👨‍🏫")
    
            switch (modalID){

                case "teModal": 

                const teedu = interactionModal.fields.getTextInputValue('teedu');

                var teembed = new EmbedBuilder()
                .setTitle(`Study kayıt yapıldı`)
                .setDescription(`Kullanıcı: ${member}\nYetkili: ${interaction.member}\nCinsiyet: ${erkekrol}`)
                .setColor('#007fff')
                .setTimestamp()
                
                switch(teedu){
                    case "9":
                    member.roles.add(türkrol);
                    member.roles.add(erkekrol);
                    member.roles.add(studentrol);
                    member.roles.add(dokuzrol);
                    member.roles.remove(unregisterrol);
                    member.roles.remove(studyregisterrol);
                    member.setNickname(null);

                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)

                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [teembed]})

                    await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                    break;

                    case "10":
                    member.roles.add(türkrol);
                    member.roles.add(erkekrol);
                    member.roles.add(studentrol);
                    member.roles.add(onrol);
                    member.roles.remove(unregisterrol);
                    member.roles.remove(studyregisterrol);
                    member.setNickname(null);

                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)

                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [teembed]})

                    await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                    break;

                    case "11":
                    member.roles.add(türkrol);
                    member.roles.add(erkekrol);
                    member.roles.add(studentrol);
                    member.roles.add(onbirrol);
                    member.roles.remove(unregisterrol);
                    member.roles.remove(studyregisterrol);
                    member.setNickname(null);
    
                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
    
                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [teembed]})
    
                    await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                    break;

                    case "12":
                    member.roles.add(türkrol);
                    member.roles.add(erkekrol);
                    member.roles.add(studentrol);
                    member.roles.add(onikirrol);
                    member.roles.remove(unregisterrol);
                    member.roles.remove(studyregisterrol);
                    member.setNickname(null);
    
                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
    
                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [teembed]})
    
                    await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                    break;                    

                    case "mezun":
                    member.roles.add(türkrol);
                    member.roles.add(erkekrol);
                    member.roles.add(studentrol);
                    member.roles.add(mezunrol);
                    member.roles.remove(unregisterrol);
                    member.roles.remove(studyregisterrol);
                    member.setNickname(null);
        
                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
        
                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [teembed]})
                    
                    await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                    break;

                    case "üni":
                    member.roles.add(türkrol);
                    member.roles.add(erkekrol);
                    member.roles.add(studentrol);
                    member.roles.add(ünirol);
                    member.roles.remove(unregisterrol);
                    member.roles.remove(studyregisterrol);
                    member.setNickname(null);
            
                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
            
                    await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [teembed]})
                    
                    await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                    break;
                

                }
                break;

                case "tkModal":

                    const tkedu = interactionModal.fields.getTextInputValue('tkedu');
    
                    var tkembed = new EmbedBuilder()
                    .setTitle(`Study kayıt yapıldı`)
                    .setDescription(`Kullanıcı: ${member}\nYetkili: ${interaction.member}\nCinsiyet: ${kızrol}`)
                    .setColor('#007fff')
                    .setTimestamp()
                    
                    switch(tkedu){
                        case "9":
                        member.roles.add(türkrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(dokuzrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [tkembed]})
    
                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "10":
                        member.roles.add(türkrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(onrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [tkembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "11":
                        member.roles.add(türkrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(onbirrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [tkembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "12":
                        member.roles.add(türkrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(onikirrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [tkembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;                    
    
                        case "mezun":
                        member.roles.add(türkrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(mezunrol);
                        member.roles.remove(unregisterrol);
                        member.setNickname(null);
            
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
            
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [tkembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "üni":
                        member.roles.add(türkrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(ünirol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
                
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
                
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [tkembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
                    }
                break;

                case "aeModal":
    
                    const aeedu = interactionModal.fields.getTextInputValue('aeedu');
    
                    var aeembed = new EmbedBuilder()
                    .setTitle(`Study kayıt yapıldı`)
                    .setDescription(`Kullanıcı: ${member}\nYetkili: ${interaction.member}\nCinsiyet: ${erkekrol}`)
                    .setColor('#007fff')
                    .setTimestamp()
                    
                    switch(aeedu){
                        case "9":
                        member.roles.add(alienrol);
                        member.roles.add(erkekrol);
                        member.roles.add(studentrol);
                        member.roles.add(dokuzrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [aeembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "10":
                        member.roles.add(alienrol);
                        member.roles.add(erkekrol);
                        member.roles.add(studentrol);
                        member.roles.add(onrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [aeembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "11":
                        member.roles.add(alienrol);
                        member.roles.add(erkekrol);
                        member.roles.add(studentrol);
                        member.roles.add(onbirrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [aeembed]})
        
                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "12":
                        member.roles.add(alienrol);
                        member.roles.add(erkekrol);
                        member.roles.add(studentrol);
                        member.roles.add(onikirrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [aeembed]})
        
                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;                    
    
                        case "üni":
                        member.roles.add(alienrol);
                        member.roles.add(erkekrol);
                        member.roles.add(studentrol);
                        member.roles.add(ünirol);
                        member.roles.remove(unregisterrol);
                        member.setNickname(null);
                
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
                
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [aeembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
                }
                break;

                case "akModal":

                    const akedu = interactionModal.fields.getTextInputValue('akedu');
    
                    var akembed = new EmbedBuilder()
                    .setTitle(`Study kayıt yapıldı`)
                    .setDescription(`Kullanıcı: ${member}\nYetkili: ${interaction.member}\nCinsiyet: ${kızrol}`)
                    .setColor('#007fff')
                    .setTimestamp()
                    
                    switch(akedu){
                        case "9":
                        member.roles.add(alienrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(dokuzrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [akembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "10":
                        member.roles.add(alienrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(onrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
    
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [akembed]})

                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})
                        
                        break;
    
                        case "11":
                        member.roles.add(alienrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(onbirrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [akembed]})
        
                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
    
                        case "12":
                        member.roles.add(alienrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(onikirrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
        
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [akembed]})
        
                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;                    
    
                        case "üni":
                        member.roles.add(alienrol);
                        member.roles.add(kızrol);
                        member.roles.add(studentrol);
                        member.roles.add(onikirrol);
                        member.roles.remove(unregisterrol);
                        member.roles.remove(studyregisterrol);
                        member.setNickname(null);
                
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "underworld-study-chat").send(`${member} Sunucumuza hoş geldin <3.`)
                
                        await interaction.guild.channels.cache.find(c => c.name.toLowerCase() == "kayıt-log").send({embeds: [akembed]})
                
                        await interactionModal.reply({ content: "Başarıyla kayıt edildi", ephemeral: true})

                        break;
                    }
                break;

            }
        }

    )},
};