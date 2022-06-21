import { Meal } from '../models/meal.js'

function newMeal(req, res) {
  Meal.find({}, function (err, meals) {
    res.render("meals/new", {
      meals: meals,
      err: req.query.error
    })
  })
}

function create(req, res) {
  Meal.find({ name: req.body.name })
    .then((meal) => {
      console.log(meal)
      if (Object.values(meal).length) {
        res.redirect(`/meals/new?error=duplicate`)
      } else {
        Meal.create(req.body).then(() => res.redirect('/meals/new'))
      }
    })
    .catch((err) => {
      console.log(err)
      res.redirect(`/meals/new`)
    })
}


export {
  newMeal as new,
  create
}

