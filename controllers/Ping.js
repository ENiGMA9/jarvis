const winston = require('winston');

exports.Ping = function (channelID) {
    try {
        if (channelID == null) {
            throw "Empty channelID in method Ping";
        }
        global.bot.sendMessage({ //We send a message
            to: channelID, //To the channel from which the message came
            message: "Pong!"
        });
    } catch (exception) {
        winston.error(exception);
    }
};