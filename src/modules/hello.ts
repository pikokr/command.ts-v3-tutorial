import { command, listener, Module, rest } from '@pikokr/command.ts'
import { Client } from '../structures/client'
import { ButtonInteraction, Message, MessageButton } from 'discord.js'
import { generateComponents, uiComponent, View } from '@pikokr/command.ts-views'

class HelloView extends View {
    @uiComponent(new MessageButton().setStyle('PRIMARY').setLabel('테스트'), { deferUpdate: false })
    async test(i: ButtonInteraction) {
        await i.reply('와아아')
    }
}

class Hello extends Module {
    helloView: HelloView

    constructor(private cts: Client) {
        super()
        this.helloView = new HelloView()
    }

    @command({ name: '말하기' })
    async say(msg: Message, @rest content: string) {
        if (!content) content = '내용이 없네요!'
        await msg.channel.send({
            content,
            allowedMentions: {
                parse: [],
            },
        })
    }

    @command({ name: 'view' })
    async view(msg: Message) {
        await msg.reply({
            content: 'views 모듈 테스트!',
            components: generateComponents(this.helloView),
        })
    }

    @listener('commandError')
    err(err: Error) {
        console.error(err)
    }

    @listener('ready')
    ready() {
        console.log(`Logged in as ${this.cts.client.user!.tag}`)
    }
}

export function install(cts: Client) {
    return new Hello(cts)
}
