const Discord = require('discord.io');
const logger = require('winston');
const mongoose = require("mongoose");
const auth = require('./auth.json');
const MessageManager = require('./managers/MessageManager');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true        //We want colorized output
});
logger.level = 'debug';  //Set logger's logging level :)


const config = require('./config/db'); // Grab the database config file
// Initialize database connection
mongoose.Promise = global.Promise;
/*mongoose.connect(config.database)
    .then(() => console.log("Mongo connected..."))
    .catch(err => console.log(err));*/

// Initialize Discord Bot
global.bot = new Discord.Client({
   token: auth.token,  //The token is taken from auth.json
   autorun: true
});


// When bot finishes init
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

// Setting bot's discord rich presence
bot.setPresence({
    game:{ //Only need the game argument for now, there are alot more supported by the API
        name:"Scrie $help pentru comenzi"
    }

})


//When the bot reads a message, either a message from the channel or direct message
bot.on('message', function (user, userID, channelID, message, evt) {


    //We assemble a new packet containing all the data we know so we can pass it around easily
    let packet = {user, userID, channelID, message, evt};

    //We call the message parser and pass the newly created packet
    MessageManager.parseMessage(packet);
});