const imgur = require('imgur-node-api')
const config = require('../config.js')
const path = require('path');
const os = require('os');
imgur.setClientID(config.imgurClientId)



function fetchImage(userId) {
    return new Promise((resolve, reject) => {
        console.log('fetch qr : ' + userId);
        console.log('upload qr : ' + userId);
        imgur.upload(path.join(os.tmpdir(), `${userId}.png`), function (err, res) {
            console.log('upload qr : ' + userId);
            console.log(res);
        if (res.data.link) {
            resolve({
              type: 'image',
              originalContentUrl: res.data.link,
              previewImageUrl: res.data.link
            })
          } else {
            console.log("err upload");
            
            reject(err)
          }
        });
      })
}

const getQrcode = (event) => {
    if (event.message.text.toLowerCase() === 'qrcode') {
        return fetchImage(event.source.userId)
      } else {
        return Promise.resolve(null)
      }
}


module.exports = {
    getQrcode
  }