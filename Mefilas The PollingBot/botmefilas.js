const discord = require('discord.js')
const client = new discord.Client()

const token = 'YOUR TOKEN HERE'

const PREFIX = '?'

var version = '1.1.0'

client.on('ready', () => console.log('Mefilas is Ready'))

client.on('message', async message => {
    if (!message.content.startsWith(PREFIX)) return

    const args = message.content.substring(PREFIX.length).split(' ')
    const command = args[0]

    if (command === 'poll') {
        const polls = args.slice(1).join(' ')

        const regex = polls.match(/"[^"]+"|[\\S]+"[^"]+/g)

        if (regex.length > 9) {
            return message.reply('You can only have 9 poll options')
        }

        let str = ''

        let emojis = [
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣'
        ]

        let i = 0

        for (const poll of regex) {
            str = str + `${emojis[i]} ${poll}\n\n`
            i++
        }

        const embed = new discord.MessageEmbed()
        .setDescription(str.replace(/"/g, ''))

        const msg = await message.channel.send(embed)

        for (let i = 0; i < regex.length; i++) {
            msg.react(emojis[i])
        }
    }

    switch(args[0]){
        case 'whoismefilas':
             message.reply('Alien Mefilas is an alien or Seijin ,who appeared in Ultraman Eps 33.')
        break;
    
        case 'whocreatedbotmefilas':
             message.reply('I created by GOD Monthy/Monthy#2006/@friedmonthy')
            break;
    
        case 'info':
            if(args[1] === 'version'){
              message.reply('Version ' + version);
            }else{
              message.reply('Invalid Arguments!!!')
            }
            break;
    
        case 'command':
             if(args[1] === 'help'){
              message.reply(`
                **Mefilas The PollingBot Command:**

                ?whoismefilas = General info of Bot Mefilas
                ?whocreatedbotmefilas = Bot Mefilas Creator info
                ?info version = Bot Mefilas version info
                ?poll = To start the Polling

                **How to use the Polling Command:**

                You can use the command like this

                ex: ?poll "your first option" "your second option"

                You can use up to 9 Options
                `)

            }else{
                message.reply('Invalid Arguments!!!')
            }
             break;
    }       
})

client.login(token)
