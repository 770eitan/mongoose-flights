import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  res.render('flights/new',{
  title: "Add Flight"
  })
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    res.render('flights/show', { 
      title: 'flight Detail', 
      flight: flight,
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
  // req.body.cast before: "me, you, us"
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(', ')
  }
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  // req.body.cast after: ["me", "you", "us"]
  console.log("req.body after", req.body)
  // New
  const flight = new Flight(req.body)
  console.log(flight)
  flight.save(function(err) {
    if (err) return res.redirect('/flights/new')
    res.redirect('/flights')
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
  Movie.findByIdAndUpdate(req.params.id, req.body, function(err, movie) {
    res.redirect(`/movies/${movie._id}`)
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
export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket
}