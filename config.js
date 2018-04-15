// const config = {
//     channelAccessToken: 'iMEDAOg3YmH1wVwyPHpL18ZrzJkkpvtVehHjJ5kGfi1hNVkCszIk7RISIy72ZdaQxfNMVQinMeEwd7tFeerzdre1EHqbR6cWpYMmwJEAv3vZaaybmZqU85theUe0ynPmmb5WBCj7vKLTghSO8iyLDgdB04t89/1O/w1cDnyilFU=',
//     channelSecret: '1b079229155702497d8daa5a7af5e5b0',
// };

// module.exports = config;

const init = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    richMenuId: process.env.RICH_MENU_ID,
    imgurClientId: process.env.IMGUR_CLIENT_ID,
}

const line = require('@line/bot-sdk');
const client = new line.Client(init);

  
  module.exports = {
    client,
    init,
    line
};