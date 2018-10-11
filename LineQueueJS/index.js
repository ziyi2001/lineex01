const line = require('@line/bot-sdk')
const EventHandler = require('./EventHandler')
const validate = require('./LineMessageValidator')
const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
}

module.exports = async function (context, lineItem) {
    try {
        const lineClient = new line.Client(config)
        const eventHandler = new EventHandler(lineClient)

        if (validate(lineItem)) {
            lineItem.events.map(function (event) {
                eventHandler.handleEvent(context, event)
            })
        } else {
            context.log.warn(validate.errors)
        }
    } catch (ex) {
        context.log.error(ex)
    }
};