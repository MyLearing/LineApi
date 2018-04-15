
const { client, init } = require('../config')
const richApi = require('../rich-menu-api')
const qrcode = require('../lib/genQrcode')
// richApi.createRichMenu()
if(!init.richMenuId) {
    richApi.createRichMenu()
}else{
    console.log("Rich-menu has been created");
}


const handleEvent = (event) => {
    qrcode.genQrcode(event.source.userId)
    console.log("gen qrcode for:  "+ event.source.userId + "  success");
    console.log("User ID is : " + event.source.userId);
    //put rich menu to individual user
    richApi.changeToRichMenuId(event.source.userId, init.richMenuId)
    console.log("event"+init.richMenuId + " user>>" + event.source.userId);
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log(event);
    console.log("-------------------------------------------------------------------------------------------------------------------------------------------------");

    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}


function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    var eventText = event.message.text.toLowerCase();

    if (eventText === 'qrcode') {
        console.log(`https://760128b8.ngrok.io/${event.source.userId}`);
        
        msg = {
            'type': 'image',
            'originalContentUrl': `https://760128b8.ngrok.io/${event.source.userId}.png`,
            'previewImageUrl': `https://760128b8.ngrok.io/${event.source.userId}.png`
        }
    } else if (eventText === 'template button') {
        msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Menu",
                "text": "Please select",
                "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                }, {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                }, {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }]
            }
        }
    } else if (eventText === 'template confirm') {
        msg = {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "Are you sure?",
                "actions": [{
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                }, {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }]
            }
        }
    } else if (eventText === 'carousel') {
        msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
                                "data": "action=buy&itemid=111"
                            },
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=111"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "http://example.com/page/111"
                            }
                        ]
                    },
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Buy",
                                "data": "action=buy&itemid=222"
                            },
                            {
                                "type": "postback",
                                "label": "Add to cart",
                                "data": "action=add&itemid=222"
                            },
                            {
                                "type": "uri",
                                "label": "View detail",
                                "uri": "http://example.com/page/222"
                            }
                        ]
                    }
                ]
            }
        }
    }

    return client.replyMessage(event.replyToken, msg);
}

module.exports = {
    handleEvent
  }