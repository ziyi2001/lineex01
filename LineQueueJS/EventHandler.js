const EventHandler = function (lineClient) {
    this.lineClient = lineClient

    this.eventHandlers = {
        message: function (context, event) {
<<<<<<< HEAD
            context.log.verbose('Sending reply message.')
=======
            context.log.debug('Sending reply message.')
>>>>>>> b1660ea1f75acb4ff1c438da81ac5aa0f3a439ba

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