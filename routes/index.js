var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Galvanize-Reads'
  });
});

router.get('/books', function(req, res, next) {
  var book_array = [];

  return knex('books')
    .then(function(results) {
      for (var i = 0; i < results.length; i++) {
        book_array.push({
          book_id: results[i].book_id,
          title: results[i].title,
          genre: results[i].genre,
          description: results[i].description,
          cover_url: results[i].cover_url,
          name: [],
        })
      }
      return knex('books')
        .innerJoin('authors_books', 'books.book_id', 'authors_books.book_id')
        .innerJoin('authors', 'authors_books.author_id', 'authors.author_id')
        .select('authors.first_name', 'authors.last_name', 'authors_books.book_id')
        .then(function(more_results) {
          for (var i = 0; i < book_array.length; i++) {
            for (var j = 0; j < more_results.length; j++) {
              if (book_array[i].book_id === more_results[j].book_id) {
                book_array[i].name.push(more_results[j].first_name + " " + more_results[j].last_name)
              }
            }
          }
          res.render('books', {
            data: book_array
          })
          console.log(book_array);
        })
    })
})


router.get('/books/new', function(req, res, next) {
  res.render('books_new');
});

router.post('/books/new', function(req, res, next) {
  return knex('books')
    .insert({
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.cover_url
    }).then(function(){
      res.redirect('/books')
    })
})

router.get('/books/edit', function(req, res, next) {
  res.render('index', {
    title: 'Galvanize-Reads'
  });
});

router.get('/books/del', function(req, res, next) {
  res.render('index', {
    title: 'Galvanize-Reads'
  });
});

router.get('/books/:id', function(req, res, next) {
  return knex('books')
    .where({
      book_id: req.params.id
    })
    .then(function(data) {
      console.log(data)
      res.render('books_single', {
        data: data
      })

    })
})

router.get('/authors', function(req, res, next) {
  var author_array = [];

  return knex('authors')
    .then(function(results) {
      for (var i = 0; i < results.length; i++) {
        author_array.push({
          author_id: results[i].author_id,
          first_name: results[i].first_name,
          last_name: results[i].last_name,
          biography: results[i].biography,
          portrait_url: results[i].portrait_url,
          title: []
        })
      }
      return knex('authors')
        .innerJoin('authors_books', 'authors.author_id', 'authors_books.author_id')
        .innerJoin('books', 'authors_books.book_id', 'books.book_id')
        .select('title', 'authors_books.author_id')
        .then(function(more_results) {
          for (var i = 0; i < author_array.length; i++) {
            for (var j = 0; j < more_results.length; j++) {
              if (author_array[i].author_id === more_results[j].author_id) {
                author_array[i].title.push(more_results[j].title)
              }
            }
          }
          res.render('authors', {
            data: author_array
          })
          console.log(author_array);
        })
    })
});



router.get('/authors/new', function(req, res, next) {
  res.render('authors_new');
});

router.post('/authors/new', function(req, res, next){
  return knex('authors')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      biography: req.body.biography,
      portrait_url: req.body.portrait_url
    }).then(function(){
      res.redirect('/authors')
    })
})

router.get('/authors/edit', function(req, res, next) {
  res.render('index', {
    title: 'Galvanize-Reads'
  });
});

router.get('/authors/del', function(req, res, next) {
  res.render('index', {
    title: 'Galvanize-Reads'
  });
});

router.get('/authors/:id', function(req, res, next) {
  return knex('authors')
    .where({
      author_id: req.params.id
    })
    .then(function(data) {
      console.log(data)
      res.render('authors_single', {
        data: data
      })

    })
})


module.exports = router;
