const commandsJSON = require('../config/commands.json');
const ControllerPerformer = require('../performers/ControllerPerformer');

let sequentialTree = {};

exports.initCommands = function () {
    const commands = commandsJSON.commands;

    commands.forEach((command) => {
        let currentCommand = null;

        command.words.forEach((wordElement) => {
          
            let word = wordElement.word;
            if (currentCommand == null) {
                sequentialTree[word] = {};
                currentCommand = sequentialTree[word];
            } else {
                currentCommand[word] = {};
                currentCommand = currentCommand[word];
            }
        });
        if (currentCommand != null) {
            currentCommand.controller = ControllerPerformer.GetController(command.target);
            currentCommand.controller();
        }
        currentCommand = null;
    });

    // console.log(sequentialTree);
   // console.log(sequentialTree["ping"]);

   console.log(sequentialTree);
//   console.log(sequentialTree.ping.pong);
  //  console.log(sequentialTree.ping.word);

    /* console.log(sequentialTree["ping"]);
     console.log(sequentialTree["ping"]["pong"] == null);
     console.log(sequentialTree["ping"]["pong"] == undefined);
     console.log(sequentialTree["ping"]["pong"]);*/
}

/*
function deeper(element){
    console.log(element);
   for(let word in element){
       // deeper(element[word]);
       console.log(element[word]);
   };*/

