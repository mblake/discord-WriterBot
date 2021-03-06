const { Command } = require('discord.js-commando');
const lib = require('./../../lib.js');

module.exports = class AskCommand extends Command {
    constructor(client) {
                
        super(client, {
            name: 'ask',
            aliases: [],
            group: 'writing',
            memberName: 'ask',
            description: 'Asks you a random question about your character or your world, to get the creative juices flowing.\nInitial questions taken from (novel-software).',
            examples: [
                '`ask c` - Asks you a question about your character',
                '`ask w` - Asks you a question about your world'
            ],
            args: [
                {
                    key: 'type',
                    prompt: 'Do you want a character-building question `c` or a world-building question `w`?',
                    type: 'string'
                }
            ]
        });
                        
    }

    run (msg, {type}){
                
        var options = [];
        type = type.toLowerCase();
                
        if (type === 'c'){
            options = require('./../../assets/json/q_char.json');
        } else if(type === 'w'){
            options = require('./../../assets/json/q_world.json');
        } else {
            return msg.say('I\'d love to ask you a question about that, but I don\'t know what it is.');
        }
                
        var rand = Math.floor( Math.random() * (options.length - 1) );
        return msg.say(`[${rand + 1}] ${options[rand]}`);               
        
    }
    
};