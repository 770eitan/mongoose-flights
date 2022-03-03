import { Flight } from "../models/flight.js"
import {Meal} from '../models/meal.js'
function newFlight(req, res) {
  res.render('flights/new',{
  title: "Add Flight"
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meal')
  .exec(function (err, flight) {
    Meal.find({_id: {$nin: flight.meal}}, function (err, meals) {
      console.log("flight ", flight)
      console.log("meals: ", meals)
      res.render("flights/show", {
        flight: flight,
        title: "flight Detail",
        meals: meals,
      })
    })
  })
}
function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect('/flights')
  })}


function create(req, res) {
  console.log("req.body before", req.body)
  req.body.nowShowing = !!req.body.nowShowing
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  // req.body.meal after: ["me", "you", "us"]
  console.log("req.body after", req.body)
  // New
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) return res.redirect('/flights/new')
    res.redirect(`/flights/${flight._id}`)
  })
}

function edit(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    res.render('flights/edit', {
      flight,
      err,
      title: "Edit flight"
    })
  })
}

function index(req, res) {
  Flight.find({}, function (error, flights) {
    console.log(error)
    res.render("flights/index", {
      error: error,
      flights: flights,
      title: "All Flights"
    })
  })
}
function update(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, function(err, flight) {
    res.redirect(`/flights/${flight._id}`)
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addToMeal(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.meal.push(req.body.mealId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMeal
}