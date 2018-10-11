const lineWebhook = require('./index');

describe('LINE Webhook', function () {
    var context = null;

    beforeEach(function () {
        context = jasmine.createSpyObj('context', ['log'])
        context.bindings = {}
        context.res = {
            status: 200,
            body: ""
        }
        context.log.warn = jasmine.createSpy('warn')
    })

    it('does not nothing when empty request', function () {
        let req = {}

        lineWebhook(context, req)

        expect(context.res.status).toBe(400)
        expect(context.res.body).toBe('No body presented.')
    })

    it('returns bad request when no LINE signature', function () {
        let req = {
            headers: {},
            rawBody: '{}'
        }

        lineWebhook(context, req)

        expect(context.res.status).toBe(400)
        expect(context.res.body).toBe('No LINE signature.')
    })

    it('does validate signature', function () {
        let req = {
            rawBody: '{"foo": "bar"}',
            headers: {
                "x-line-signature": "dzJZAsrKgS3CWXM6rNBGtzgXNyx3e42VtAJkdHRRbhM="
            }
        }

        lineWebhook(context, req)

        expect(context.res.status).toBe(400)
        expect(context.res.body).toBe('Invalid LINE signature.')
    })

    it('queues request body', function () {
        let body = {}
        let req = {
            body: body,
            rawBody: JSON.stringify(body),
            headers: {
                "x-line-signature": "dzJZAsrKgS3CWXM6rNBGtzgXNyx3e42VtAJkdHRRbhM="
            }
        }

        lineWebhook(context, req)

        expect(context.bindings.lineItem).toBe(body)
        expect(context.res.status).toBe(200)
        expect(context.res.body).toBe("")
    })


})