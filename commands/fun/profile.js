const { Command } = require('discord.js-commando');
const Stats = require('./../../structures/stats.js');
const XP = require('./../../structures/xp.js');
const Goal = require('./../../structures/goal.js');
const lib = require('./../../lib.js');

module.exports = class ProfileCommand extends Command {
	constructor(client) {
		super(client, {
                    name: 'profile',
                    aliases: [],
                    group: 'fun',
                    memberName: 'profile',
                    description: 'Displays your user statistics for this server',
                    guildOnly: true,
                    args: [
                        {
                            key: 'who',
                            default: 'me',
                            prompt: '',
                            type: 'string'
                        }
                    ]
		});
                                
	}

	run(msg, {who}) {
            
            var guildID = msg.guild.id;
            
            if (who !== 'me'){
                
                var find = lib.getMemberByName(msg, who);
                if (find !== false){
                    var userID = find.id;
                    var userName = who;
                } else {
                    return msg.say('Could not find that user.');
                }
                
            } else {
                var user = msg.author;
                var userID = user.id;
                var userName = user.username;
            }
                                
            
            var xp = new XP(guildID, userID, msg);
            var userXp = xp.get();
            
            var stats = new Stats();
            var goal = new Goal(msg, guildID, userID);
            
            var total_wc = stats.get(guildID, userID, 'total_words_written');
            var sprint_wc = stats.get(guildID, userID, 'sprints_words_written');
            var sprints_started = stats.get(guildID, userID, 'sprints_started');
            var sprints_completed = stats.get(guildID, userID, 'sprints_completed');
            var sprints_won = stats.get(guildID, userID, 'sprints_won');
            var challenges_completed = stats.get(guildID, userID, 'challenges_completed');
            var daily_goals_completed = stats.get(guildID, userID, 'daily_goals_completed');
            var dailyGoal = goal.get('daily');
            
        
            return msg.embed({
                color: 3066993,
                title: userName,
                fields: [
                    {
                        name: 'Lvl (XP)',
                        value: `Level ${userXp.lvl} (${userXp.xp})`,
                        inline: true
                    },
                    {
                        name: 'Words Written',
                        value: (total_wc) ? total_wc.value : 0,
                        inline: true
                    },
                    {
                        name: 'Words Written in Sprints',
                        value: (sprint_wc) ? sprint_wc.value : 0,
                        inline: true
                    },
                    {
                        name: 'Sprints Started',
                        value: (sprints_started) ? sprints_started.value : 0,
                        inline: true
                    },
                    {
                        name: 'Sprints Completed',
                        value: (sprints_completed) ? sprints_completed.value : 0,
                        inline: true
                    },
                    {
                        name: 'Sprints Won',
                        value: (sprints_won) ? sprints_won.value : 0,
                        inline: true
                    },
                    {
                        name: 'Challenges Completed',
                        value: (challenges_completed) ? challenges_completed.value : 0,
                        inline: true
                    },
                    {
                        name: 'Daily Goals Completed',
                        value: (daily_goals_completed) ? daily_goals_completed.value : 0,
                        inline: true
                    },
                    {
                        name: 'Daily Goal Progress',
                        value: (dailyGoal) ? ((Math.floor((dailyGoal.current / dailyGoal.goal) * 100))) + '%' : 0 + '%',
                        inline: true
                    }
                ]                        
            });
	}
};