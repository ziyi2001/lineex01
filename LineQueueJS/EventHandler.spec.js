const EventHandler = require("./EventHandler");
const line = require("@line/bot-sdk");

describe("EventHandler", function() {
  const config = {
    channelAccessToken: "dummy access token"
  };
  var lineClient = new line.Client(config);
  var instance = null;
  var logger = null;

  beforeEach(() => {
    logger = jasmine.createSpyObj("logger", [
      "verbose",
      "info",
      "warn",
      "error"
    ]);

    instance = new EventHandler(logger, lineClient);
  });

  it("reply to a message", function() {
    spyOn(lineClient, "replyMessage").and.returnValue(
      new Promise(function() {})
    );

    const lineitem = {
      events: [
        {
          type: "message",
          replyToken: "reply token",
          message: {
            type: "text",
            text: "foobar"
          }
        }
      ]
    };

    instance.handleItem(lineitem);

    expect(lineClient.replyMessage).toHaveBeenCalledWith(
      "reply token",
      jasmine.objectContaining({
        type: "text",
        message: "僕とんとん\n" + "foobar"
      })
    );
  });

  it("does not nothing", function() {
    spyOn(lineClient, "replyMessage").and.returnValue(
      new Promise(function() {})
    );

    const lineitem = {
      events: [
        {
          type: "join",
          replyToken: "token",
          message: {
            type: "text",
            text: "foobar"
          }
        }
      ]
    };

    instance.handleItem(lineitem);

    expect(logger.warn).toHaveBeenCalled();
    expect(lineClient.replyMessage).toHaveBeenCalledTimes(0);
  });

  it("ignores invalid item", function() {
    instance.handleItem({});

    expect(logger.error).toHaveBeenCalled();
  });
});
