const line = require("@line/bot-sdk");
const EventHandler = require("./EventHandler");
const validate = require("./LineMessageValidator");
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

module.exports = async function(context, lineItem) {
  try {
    const lineClient = new line.Client(config);
    const eventHandler = new EventHandler(context.log, lineClient);

    eventHandler.handleItem(lineItem);
  } catch (ex) {
    context.log.error(ex);
  }
};
