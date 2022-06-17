import { Movie } from '../models/movie.js'


function show(req, res) {
  Movie.findById(req.params.id)
  .then(movie => {
    res.render('movies/show', {
      title: 'Movie Detail',
      movie: movie
    })
  })
}










// .catch(error => {
//   console.log(error)
//   res.redirect('/movies')
// })

export {
  show
}

