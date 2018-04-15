const {init, client }  = require('./config')
const axios = require('axios')
const fs = require('fs')


const changeToRichMenuId = (userId, richMenuId) => {
    return axios({
                    method: 'POST',
                    url: `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
                    headers: {
                        Authorization: `Bearer ${init.channelAccessToken}`
                    },
                    json: true
                }).then(function (response) {
                    console.log('response >>> '+ response );
                }).catch(function (error) {
                    console.log(erro);
                });

}

const createRichMenu = () =>{
    client.createRichMenu({
        size: { width: 2500, height: 1686 }, // Define size of rich menu
        selected: true, // Always display
        name: 'Food cort', // rich menu name
        chatBarText: 'Qrcode', // show to user
        areas: [ // Area and action of each boundary
            {
                "bounds": {
                  "x": 29,
                  "y": 610,
                  "width": 2461,
                  "height": 552
                },
                "action": {
                  "type": "uri",
                  "uri": "tel:+66909300861"
                }
              },
              {
                "bounds": {
                  "x": 19,
                  "y": 1212,
                  "width": 2461,
                  "height": 474
                },
                "action": {
                  "type": "uri",
                  "uri": "https://goo.gl/maps/P28pxdMY1iq"
                }
              },
              {
                "bounds": {
                  "x": 50,
                  "y": 50,
                  "width": 2422,
                  "height": 514
                },
                "action": {
                  "type": "message",
                  "text": "qrcode"
                }
              }
        ]
      }).then(richMenuId => {
          fs.readFile("./.env", 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            const result = data.replace(/RICH_MENU_ID=.*/g, `RICH_MENU_ID=${richMenuId}`);
            
            fs.writeFile("./.env", result, 'utf8', function (err) {
                if (err) return console.log(err);
            });
         });
            console.log(richMenuId);
            client.setRichMenuImage(richMenuId, fs.createReadStream('./qrcode.png')).then(res => console.log("success>>" +  res)).catch(err => console.log(err))    
      })
}
module.exports = {
    createRichMenu,
    changeToRichMenuId,
}


