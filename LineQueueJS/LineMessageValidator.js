const Ajv = require('ajv')
const ajv = new Ajv()
const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "required": [
        "events"
    ],
    "properties": {
        "events": {
            "$id": "#/properties/events",
            "type": "array",
            "items": {
                "type": "object",
                "required": ["type", "replyToken", "message"],
                "properties": {
                    "type": {
                        "type": "string"
                    },
                    "replyToken": {
                        "type": "string"
                    },
                    "message": {
                        "type": "object",
                        "required": ["type"],
                        "properties": {
                            "type": {
                                "type": "string"
                            },
                            "text": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = ajv.compile(schema)