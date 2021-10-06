const sqlite = require('sqlite3').verbose()
const DBSOURCE = 'item.db'

let db = new sqlite.Database(DBSOURCE, (e) => {
  if (e) {
    console.error(e.message)
    throw e
  } else {
    console.log('Connected to SQlite database.')
  }
})

module.exports = db
