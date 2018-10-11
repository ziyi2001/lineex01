const line = require('@line/bot-sdk')
const lineHeaderKey = 'x-line-signature'
const channelSecret = process.env.LINE_CHANNEL_SECRET

function badRequest(context, message) {
    context.log.warn(message)
    context.res = {
        status: 400,
        body: message
    }
}

module.exports = async function (context, req) {
    if (!req.rawBody) {
        badRequest(context, 'No body presented.')
        return
    }

    if (!req.headers || !req.headers[lineHeaderKey]) {
        badRequest(context, 'No LINE signature.')
        return
    }

    if (!line.validateSignature(req.rawBody, channelSecret, req.headers[lineHeaderKey])) {
        badRequest(context, 'Invalid LINE signature.')
        return
    }

    context.bindings.lineItem = req.body
};