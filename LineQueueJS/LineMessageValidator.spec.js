const instance = require('./LineMessageValidator')

describe('LINE message validator', () => {

    it('validate JSON', () => {
        const data = {
            events: [{
                type: 'message',
                replyToken: 'token',
                message: {
                    type: 'text',
                    text: 'foobar'
                }
            }]
        }

        const actual = instance(data)

        expect(actual).toBeTruthy()
    })

    it('returns false', () => {
        const data = {}

        const actual = instance(data)

        expect(actual).toBeFalsy()
    })

})