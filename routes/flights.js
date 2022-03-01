import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.post('/', flightsCtrl.create)
router.get('/:id', flightsCtrl.show)
router.post('/:id/tickets', flightsCtrl.createTicket)
router.delete('/:id', flightsCtrl.delete)
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)

//addToFlight, addToDestinations
//router.post("/:id/performers", moviesCtrl.addToCast)
router.post('/:id/destinations', flightsCtrl.addDestinationToFlight)
router.delete('/:id/destinations/:destinationId', flightsCtrl.removeDestination)


export {
  router
}
