import { command, listener, Module, rest } from '@pikokr/command.ts'
import { Client } from '../structures/client'
import { Message } from 'discord.js'

class Hello extends Module {
    constructor(private cts: Client) {
        super()
    }

    @command({name: '말하기'})
    async say(msg: Message, @rest content: string) {
        if (!content) content = '내용이 없네요!'
        await msg.channel.send({
            content,
            allowedMentions: {
                parse: []
            }
        })
    }

    @listener('ready')
    ready() {
        console.log(`Logged in as ${this.cts.client.user!.tag}`)
    }
}

export function install(cts: Client) {
    return new Hello(cts)
}
