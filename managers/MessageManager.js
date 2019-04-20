import Commands from '../config/commands.json'; 
import logger from 'winston';



//The method that parses any message, takes in a packet with necessary data as follows:
//@user - username, not nick, not #
//@userID - unique userID
//@channelID - channel's ID within the GUILD
//@message - the actual message
//@evt - the raw event passed from the API

export function parseMessage (packet) {

    global.bot.sendMessage({
        to: packet.channelID,
        message: packet.message.toUpperCase()
    });

    if(packet.message.substring(0, 7).toLowerCase() !== general.cmdPrefix){ // We check if the first character is our choosen prefix
        return 0;
    } // We exit this if not

    let args = packet.message.substring(1).split(' '); //We grab all words in the message as argument except the first character which should be the prefix
   
    //TO-DO: Insert lexicon call

    if (commands[cmd] != null) { //We check to see if the command exists
        let command = commands[cmd];  //We assign the command with it's configs to an auxiliary variable for faster access
        if (args.length < command.min) {  //We check if the number of the arguments is in range and provide feedback accordingly
            global.bot.sendMessage({ //We send a message
                to: packet.channelID, //To the channel from which the message came
                message: "Prea puține argumente!"
            });
            return 0; //Then exit the parser
        } else if (args.length > command.min) { //We check if the number of the arguments is in range and provide feedback accordingly
            global.bot.sendMessage({ //We send a message
                to: packet.channelID, //To the channel from which the message came
                message: "Prea multe argumente!"
            });
            return 0; //Then exit the parser
        }


        let split = command.target.split("->"); //We split the target file from the target method, both coming in a single line from our config
        const controller = split[0]; //The first one is the target file / controller
        const method = split[1]; //The second one is the actual method within the controller

        logger.info(controller + method);
        require('../controllers/'+controller)[method](packet,args); //Basically call the method pointed by the config and pass along our packet and splitted arguments




    }

}