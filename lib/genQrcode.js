const qrImage = require('qr-image')
const fs = require('fs')
const genQrcode = (userId) => {
        qrImage
        .image(`https://760128b8.ngrok.io/images/${userId}`, {type:'png', size:20})
        .pipe(fs.createWriteStream(`./images/${userId}.png`))
}


module.exports = {genQrcode}