const EventHandler = require('./EventHandler')
const line = require('@line/bot-sdk')

describe('EventHandler', function () {
    const config = {
        channelAccessToken: 'dummy access token'
    }
    var lineClient = new line.Client(config)
    var instance = null
    var context = null

    beforeEach(() => {
        const log = jasmine.createSpyObj('log', ['verbose', 'info', 'warn', 'error'])
        context = jasmine.createSpyObj('context', ['log'])
        context.log = log

        instance = new EventHandler(lineClient)
    })

    it('reply to a message', function () {
        spyOn(lineClient, 'replyMessage')
            .and.returnValue(new Promise(function () {}))

        const event = {
            type: 'message',
            replyToken: 'reply token',
            message: {
                type: 'text',
                text: 'foobar'
            }
        }

        instance.handleEvent(context, event)

        expect(lineClient.replyMessage)
            .toHaveBeenCalledWith('reply token', jasmine.objectContaining({
                type: 'text',
                message: '僕とんとん\n' + 'foobar'
            }))
    })

    it('does not nothing', function () {
        const event = {
            type: 'join'
        }

        instance.handleEvent(context, event)
    })

})