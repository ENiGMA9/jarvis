exports.getController = function (controllerString) {
  let split = controllerString.split("->"); //We split the target file from the target method, both coming in a single line from our config
  const controller = split[0]; //The first one is the target file / controller
  const method = split[1]; //The second one is the actual method within the controller

  try {
    return require('../controllers/' + controller)[method];
  } catch (exception) {
    global.logger.error("Caught error: '" + exception + "' for controller " + controller + "->" + method);
  }

};