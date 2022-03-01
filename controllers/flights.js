import { Flight } from '../models/flight.js'
import { Destination } from '../models/destination.js'


function index(req, res) {
  Flight.find({}) //find all flights
    .sort({ departs: 'asc' }) // sort method accepts field and sorting value
    .exec(function (err, flights) { // execute callback function
      //append class 
      flights.forEach(function (flight) { // look at each flight
        // if departure takes place before this moment in time
        if (flight.departs?.toISOString() < new Date().toISOString()) {
          flight.class = 'red' // add a temp class property
        }
      })
      res.render('flights/index', {
        err: err,
        flights: flights,
        title: 'All Flights'
      })
    })
}


function newFlight(req, res) {
  // To display default date in flights/new derpature input, need to pass default flight date
  // Format the date for type="datetime-local". ISO string converts the date obj to a string, slice returns first 16 characters
  // toString() method would produce something like - Sat Oct 29 2022 but ISO will maintain the year first format 2022-10-29T12:42:14.054Z

  // 1. Using the model
  const newFlight = new Flight()
  const defaultDate = newFlight.departs // Obtain the default date
  const formattedDate = defaultDate.toISOString().slice(0, 16) // Format the date for the value attribute of the input

  // 2. Using a new date
  // const today = new Date() // find current date
  // console.log('today', today)
  // const oneYearFromNow = today.getFullYear() + 1 // get/isolate the year add 1 to it. Expected output => 2022
  // const defaultDate = today.setFullYear(oneYearFromNow) // update year in
  // console.log('defaultDate', defaultDate)
  // const formattedDate = new Date(defaultDate).toISOString().slice(0, 16)


  res.render("flights/new", { // render new flight form
    // we need to format the date for type="datetime-local"
    flightDate: formattedDate // format with ISOString and return first 16 characters
  })
}


function create(req, res) {
  for (let key in req.body) { if (req.body[key] === '') delete req.body[key] }
  Flight.create(req.body, function (err, flight) {
    if (err) return res.redirect(`/flights/new`) //render will cause date issue
    res.redirect(`/flights`)
  })
}

// function create(req, res) {
//   const flight = new Flight(req.body)
//   flight.save((err) => {
//     console.log(err)
//     res.redirect('/flights')
//   })
// }


//Destination.find - find all the destinations not currently in flight.destinations
//pass that in to create a list of destinations that can be added to a flight
//We have already found the flight, which contains a list of destination ids
//this allows use to display potential and existing destinations on the same page, without overlap


function show(req, res) {
  Flight.findById(req.params.id).populate('destinations').exec(function (err, flight) {
    Destination.find({ _id: { $nin: flight.destinations } }, (err, destinations) => {
      res.render('flights/show', {
        flight: flight,
        err: err,
        destinations: destinations
      })
    })
  })
}



function createTicket(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    flight.tickets.push(req.body)
    flight.save((err) => {
      if (err) return res.render('/flights/new')
      res.redirect(`/flights/${flight._id}`)
    })
  })
}


// DELETE	/blogs/:blogId/comments/:commentId	Delete specified comment
function deleteTicket(req, res) {
  Flight.findById(req.params.flightId, function (err, flight) {
    flight.tickets.remove({ _id: req.params.ticketId })
    flight.save(function (err) {
      if (err) return res.redirect(`/flights/${flight._id}`)
      res.redirect(`/flights/${flight._id}`)
    })
  })
}



function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function (err, flight) {
    res.redirect(`/flights`)
  })
}


function addDestinationToFlight(req, res) {
  Flight.findById(req.params.id, (err, flight) => {
    flight.destinations.push(req.body.destinationId)
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}



function removeDestination(req, res) {
  Flight.findById(req.params.id, (err, flight) => {
    console.log(flight.destinations)
    flight.destinations.remove({ _id: req.params.destinationId })
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}




export {
  index,
  newFlight as new,
  deleteFlight as delete,
  create,
  show,
  createTicket,
  deleteTicket,
  addDestinationToFlight,
  removeDestination,
}





