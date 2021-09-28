import { CommandClient } from '@pikokr/command.ts'
import Discord, { Intents, IntentsString } from 'discord.js'
import { config } from '../config'

const excludedIntents: IntentsString[] = ['GUILD_MEMBERS', 'GUILD_PRESENCES']

export class Client extends CommandClient {
    constructor() {
        super({
            client: new Discord.Client({
                intents: (Object.keys(Intents.FLAGS) as IntentsString[]).filter((x)=>!excludedIntents.includes(x)),
            }),
            owners: 'auto',
            command: {
                prefix: config.prefix,
            },
            slashCommands: {
                autoSync: true,
                guild: config.slash.guild,
            },
        })

        this.registry.loadModulesIn('modules')
    }
}
