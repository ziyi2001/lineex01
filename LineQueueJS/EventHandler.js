const EventHandler = function (lineClient) {
    this.lineClient = lineClient

    this.eventHandlers = {
        message: function (context, event) {
            context.log.verbose('Sending reply message.')

            let message = {
                type: 'text',
                message: '僕とんとん\n' + event.message.text
            }

            lineClient.replyMessage(event.replyToken, message)
                .catch(function (err) {
                    context.log.error(err)
                })
        }
    }
}

EventHandler.prototype.handleEvent = function (context, event) {
    if (this.eventHandlers[event.type]) {
        this.eventHandlers[event.type](context, event)
    } else {
        context.log.warn('Not implemented type %s', event.type)
    }
}

module.exports = EventHandler