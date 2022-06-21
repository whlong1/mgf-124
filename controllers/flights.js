import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function index(req, res) {
  Flight.find({}).sort({ departs: 'asc' })
    .then((flights) => {
      flights.forEach(function (flight) {
        // if departure takes place before this moment in time:
        if (flight.departs.toISOString() < new Date().toISOString()) flight.class = 'red'
      })
      res.render('flights/index', {
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

  console.log(defaultDate)
  console.log(formattedDate)

  res.render("flights/new", { // render new flight form
    // we need to format the date for type="datetime-local"
    flightDate: formattedDate // format with ISOString and return first 16 characters
  })
}


function create(req, res) {
  for (let key in req.body) { if (req.body[key] === '') delete req.body[key] }
  Flight.create(req.body)
    .then((flight) => {
      res.redirect(`/flights`)
    })
    .catch((err) => {
      if (err) return res.redirect(`/flights/new`)
    })
}


//Meal.find - find all the Meals not currently in flight.Meals
//pass that in to create a list of Meals that can be added to a flight
//We have already found the flight, which contains a list of Meal ids
//this allows use to display potential and existing Meals on the same page, without overlap


function show(req, res) {
  Flight.findById(req.params.id).populate('meals')
  .then((flight)=> {
    Meal.find({ _id: { $nin: flight.meals } })
    .then((meals) => {
      res.render('flights/show', {
        flight: flight,
        meals: meals,
      })
    })
  })
  .catch((err)=> {
    console.log(err)
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
    .then((flight) => {
      flight.tickets.push(req.body)
      flight.save().then((flight) => res.redirect(`/flights/${flight._id}`))
    }).catch((err) => {
      res.render('/flights/new')
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
  Flight.findByIdAndDelete(req.params.id)
  .then((flight) => {
    res.redirect(`/flights`)
  })
}

function addMealToFlight(req, res) {
  Flight.findById(req.params.id, (err, flight) => {
    flight.meals.push(req.body.mealId)
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function removeMeal(req, res) {
  Flight.findById(req.params.id, (err, flight) => {
    flight.meals.remove({ _id: req.params.mealId })
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
    .then((flight) => {
      res.render('flights/edit', {
        flight: flight
      })
    })
    .catch((error) => {
      console.log(error)
      res.redirect('/skills')
    })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body)
    .then((flight) => {
      res.redirect(`/flights/${req.params.id}`)
    })
    .catch((error) => {
      console.log(error)
      res.redirect('/flights')
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
  addMealToFlight,
  removeMeal,
  edit,
  update
}



