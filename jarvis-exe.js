const Discord = require('discord.io');
const winston = require('winston');
//const mongoose = require('mongoose');
const auth = require('./auth.json');
//const MessageManager = require('./managers/MessageManager');
const Parser = require("./workers/Parser");


// Configure winston settings
//winston.remove(winston.transports.Console);
winston.configure({ transports: [new winston.transports.File({ filename: 'logfile.log' })] });

winston.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf((info) => {
            const {
                timestamp, level, message, ...args
            } = info;

            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
    )
}));
winston.level = 'silly';

global.logger = winston;


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

let bot = global.bot; //fix for linters

// When bot finishes init
bot.on('ready', function (evt) {
    winston.info("Connected");
    winston.info("Logged in as: ");
    winston.info(bot.username + " - (" + bot.id + ")");
    Parser.initCommands();
});

// Setting bot's discord rich presence
bot.setPresence({
    game: {
        name: "AVENGERS ENDGAME."
    }

});


//When the bot reads a message, either a message from the channel or direct message
bot.on('message', function (user, userID, channelID, message, evt) {

    let packet = { user, userID, channelID, message, evt };
    // MessageManager.parseMessage(packet);
});