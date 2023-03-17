const axios = require('axios')

module.exports = async ({ context, telegram }) => {
  const url = 'https://api.telegram.org/bot'

  let msg =
    `📣 Medcloud Alert` +
    `${JSON.stringify(context)}` +
    ` развёрнут на [BETA](https://beta.ipakyulibank.uz)`

  await axios.post(`${url}${telegram.token}/sendMessage`, {
    chat_id: telegram.chat_id,
    parse_mode: 'MarkdownV2',
    text: msg,
  })
  return true
}
