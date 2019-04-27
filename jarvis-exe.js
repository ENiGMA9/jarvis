const Discord = require('discord.io');
const logger = require('winston');
//const mongoose = require('mongoose');
const auth = require('./auth.json');
//const MessageManager = require('./managers/MessageManager');
const Parser = require("./workers/Parser");


// Configure logger settings
logger.remove(logger.transports.Console);
logger.configure({ transports: [new logger.transports.File({ filename: 'logfile.log' }) ]});
logger.level = 'debug';



// Initialize database connection
//const config = require('./config/db'); 

//mongoose.Promise = global.Promise;
/*mongoose.connect(config.database)
    .then(() => console.log("Mongo connected..."))
    .catch(err => console.log(err));*/



// Initialize Discord Bot
global.bot = new Discord.Client({
   token: auth.token,  
   autorun: true
});

let bot = global.bot //fix for linters

// When bot finishes init
bot.on('ready', function (evt) {
    logger.info("Connected");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");
    Parser.initCommands();
});

// Setting bot's discord rich presence
bot.setPresence({
    game:{
        name:"AVENGERS ENDGAME."
    }

});


//When the bot reads a message, either a message from the channel or direct message
bot.on('message', function (user, userID, channelID, message, evt) {

    let packet = {user, userID, channelID, message, evt};
   // MessageManager.parseMessage(packet);
});