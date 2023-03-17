const axios = require('axios')

module.exports = async ({ context, telegram }) => {
  const url = 'https://api.telegram.org/bot'

  let msg =
    `📣 Medcloud Alert` +
    `Admin panel updated` +
    ` развёрнут на [BETA](https://admin-medcloud.netlify.app)`

  await axios.post(`${url}${telegram.token}/sendMessage`, {
    chat_id: telegram.chat_id,
    parse_mode: 'MarkdownV2',
    text: msg,
  })
  return true
}
