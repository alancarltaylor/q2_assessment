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
          first_name: [],
          last_name: []
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
                book_array[i].first_name.push(more_results[j].first_name)
                book_array[i].last_name.push(more_results[j].last_name)
              }
            }
            //console.log(more_results)
          }
          res.render('books', {
            data: book_array
          })
          console.log(book_array);
        })
    })
})

router.get('/books/new', function(req, res, next) {
  res.render('index', {
    title: 'Galvanize-Reads'
  });
});

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

router.get('/authors', function(req, res, next) {
  res.render('authors', {
    title: 'Galvanize-Reads'
  });
});

router.get('/authors/new', function(req, res, next) {
  res.render('index', {
    title: 'Galvanize-Reads'
  });
});

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



module.exports = router;
