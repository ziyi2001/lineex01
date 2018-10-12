const validate = require("./LineMessageValidator");

const EventHandler = function(logger, lineClient) {
  this.logger = logger;

  this.eventHandlers = {
    message: function(event) {
      logger.verbose("Sending reply message.");

      let message = {
        type: "text",
        text: "僕とんとん\n" + event.message.text
      };

      lineClient.replyMessage(event.replyToken, message).catch(function(err) {
        logger.error(err);
      });
    }
  };

  this.handle = event => {
    if (this.eventHandlers[event.type]) {
      this.eventHandlers[event.type](event);
    } else {
      logger.warn("Not implemented type %s", event.type);
    }
  };
};

EventHandler.prototype.handleItem = function(lineItem) {
  if (validate(lineItem)) {
    lineItem.events.map(this.handle);
  } else {
    this.logger.error(validate.errors);
  }
};

module.exports = EventHandler;
