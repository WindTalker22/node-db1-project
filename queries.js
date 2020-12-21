const db = require("./data/dbConfig")
module.exports = {
  getstuff(query) {
    const data = db("accounts")
    if (query.limit == 5) {
      data.limit(5)
    }
    return data
  }
}
