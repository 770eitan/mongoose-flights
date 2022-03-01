import { Router } from 'express'
import * as flightsCtrl from "../controllers/flights.js"

const router = Router()

// GET - localhost:3000/flights
router.get("/", flightsCtrl.index)
// GET - localhost:3000/flights/new
router.get('/new', flightsCtrl.new)

// POST - localhost:3000/flights
router.post("/", flightsCtrl.create)

router.get('/:id', flightsCtrl.show)

router.delete("/:id", flightsCtrl.delete)
router.get("/:id/edit", flightsCtrl.edit)
router.put("/:id", flightsCtrl.update)
router.post('/:id/ticket', flightsCtrl.createTicket)

export {
  router
}
