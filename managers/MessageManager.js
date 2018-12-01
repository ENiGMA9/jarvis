let CMD = require("../config/commands.json"); //Grab our commands file
const logger = require('winston');

//Work-In-Progress hot-reload feature
module.exports.hotReload = function(){
    CMD = require("../config/commands.json");
}


//The method that parses any message, takes in a packet with necessary data as follows:
//@user - username, not nick, not #
//@userID - unique userID
//@channelID - channel's ID within the GUILD
//@message - the actual message
//@evt - the raw event passed from the API
module.exports.parseMessage = function (packet) {

    if(packet.message.substring(0, 1) !== CMD.general.cmdPrefix) // We check if the first character is our choosen prefix
        return 0; // We exit this if not

    let args = packet.message.substring(1).split(' '); //We grab all words in the message as argument except the first character which should be the prefix
    let cmd =  args[0]; //We know the first word should be the actual command
    args = args.splice(1); //And we take it out from our arguments

    if (CMD.commands[cmd] != null) { //We check to see if the command exists
        let command = CMD.commands[cmd];  //We assign the command with it's configs to an auxiliary variable for faster access
        if (args.length < command.min) {  //We check if the number of the arguments is in range and provide feedback accordingly
            global.bot.sendMessage({ //We send a message
                to: packet.channelID, //To the channel from which the message came
                message: "Prea puține argumente!"
            });
            return 0; //Then exit the parser
        } else if (args.length > command.min) { //We check if the number of the arguments is in range and provide feedback accordingly
            global.bot.sendMessage({ //We send a message
                to: packet.channelID, //To the channel from which the message came
                message: "Prea mule argumente!"
            });
            return 0; //Then exit the parser
        }


        let split = command.target.split("->"); //We split the target file from the target method, both coming in a single line from our config
        const controller = split[0]; //The first one is the target file / controller
        const method = split[1]; //The second one is the actual method within the controller

        logger.info(controller + method);
        require("../controllers/"+controller)[method](packet,args); //Basically call the method pointed by the config and pass along our packet and splitted arguments

        /*.catch(()=>{
            console.log("EROARE PARSARE");
        });*/


    } else { //If the command doesn't exist we give feeback
        global.bot.sendMessage({
            to: packet.channelID,
            message: "Comandă inexistentă!"
        });
        return 0;
    }
}