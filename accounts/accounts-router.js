const express = require("express")
const query = require("../queries")
// database access using knex
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", (req, res) => {
  const { limit } = req.query
  console.log(limit == 5, "HELLO")
  query
    .getstuff({ limit })
    .then(
      accounts => res.status(200).json(accounts) & console.log(accounts.length)
    )
    .catch(err => res.status(500).json(err.message))
})

// // Get All Accounts
// router.get("/", (req, res) => {
//   // list of accounts
//   // select from accounts
//   // all database operations return a promise
//   const { limit } = req.query
//   console.log(limit == 5, "Hello")

//   db.select("*")
//     .from("accounts")
//     .then(accounts => {
//       res.status(200).json(accounts)
//     })
//     .catch(error => {
//       console.log(error)
//       res.status(500).json({ error: "failed to get list of accounts" })
//     })
// })

router.get("/:id", (req, res) => {
  // an account by it's Id
  // select * from accounts where id = :id
  // const {id} = req.params.id
  db("accounts")
    .where({ id: req.params.id })
    .first() // grab the first item on the return array
    .then(account => {
      res.status(200).json(account)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "failed to get the account" })
    })
})

router.post("/", (req, res) => {
  // add post
  // insert into posts () values ()

  db("accounts")
    .insert(req.body, "id") // will generate a warning in console when using sqlite, ignoe that
    .then(account => {
      res.status(201).json(account)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "failed to add account" })
    })
})

router.put("/:id", (req, res) => {
  // update account
  // const {id} = req.params
  // const changes = req.body

  db("accounts")
    .where({ id: req.params.id }) //
    .update(req.body)
    .then(updated => {
      res.status(201).json(updated)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "failed to update account" })
    })
})

router.delete("/:id", (req, res) => {
  // delete account
  // destructure id from req.params
  const { id } = req.params
  // const changes = req.body
  db("accounts")
    .where({ id }) // remember to filter or all records will be deleted
    .delete()
    .then(account => {
      res.status(201).json(account)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "failed to remove account" })
    })
})

module.exports = router
