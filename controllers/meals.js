import { Meal } from '../models/meal.js'

//========================================================================================================

// list of destinations should be displayed below the form to prevent the user from entering duplicates. 
// include a query for ALL destinations to show them on the page


// 'unique: true' property has been applied to the destination schema
// If a user enters an existing airport, err will evaluate to true
// and the user will be redirected to /destinations/new?error=true
// A query string ( ?error=true ) has been appended to the existing path
// Accessible through req.query.error
// The '?' initiates the query string

function newMeal(req, res) {
  Meal.find({}, function (err, meals) {
    res.render("meals/new", {
      meals: meals,
      err: req.query.error ? req.query.error : err
    })
  })
}

function create(req, res) {
  Meal.find({ name: req.body.name }, function (err, meal) {
    if (Object.values(meal).length) {
      console.log('HIT', Object.values(meal).length)
      res.redirect(`/meals/new?error=true`)
    } else {
      Meal.create(req.body, function (err) {
        if (err) {
          res.redirect(`/meals/new?error=true`)
        } else {
          res.redirect('/meals/new')
        }
      })
    }
  })
}




// function create(req, res) {
//   Destination.create(req.body, function (err, destination) {
//     if (err) {
//       return Destination.find({}, function (err, destinations) {
//         res.render("destinations/new", {
//           destinations: destinations,
//           err: true
//         })
//       })
//     }
//     res.redirect('/destinations/new')
//   })
// }

//========================================================================================================
// METHOD 2

// function newDestination(req, res) {
//   Destination.find({}, function (err, destinations) {
//     res.render("destinations/new", { // render new flight form
//       destinations: destinations,
//       err: err
//     })
//   })
// }


// function create(req, res) {
//   Destination.create(req.body, function (err, destination) {
//     if (err) {
//       return Destination.find({}, function (err, destinations) {
//         res.render("destinations/new", {
//           destinations: destinations,
//           err: true
//         })
//       })
//     }
//     res.redirect('/destinations/new')
//   })
// }


//========================================================================================================
// METHOD 3

// function newDestination(req, res) {
//   Destination.find({}, function (err, destinations) {
//     res.render("destinations/new", { // render new flight form
//       destinations: destinations,
//       err: err
//     })
//   })
// }


// function create(req, res) {
//   Destination.findOne({ airport: req.body.airport }).exec(function (err, destination) {
//     if (destination) {
//       return Destination.find({}, function (err, destinations) {
//         res.render("destinations/new", {
//           destinations: destinations,
//           err: true,
//         })
//       })
//     } else {
//       return Destination.create(req.body, function (err) {
//         res.redirect('/destinations/new')
//       })
//     }
//   })
// }




export {
  newMeal as new,
  create
}

