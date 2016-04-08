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
    var data = {};
    var first_name = {};
    var last_name = {};
    knex('books')
      .then(function(results) {
        data = results
        //for (var i = 0; i < data[0].length; i ++){
        //console.log()
          // knex('authors_books')
          // .where({book_id: data[i].book_id})
          // .innerJoin('authors', 'authors_books.author_id', 'authors.author_id')
          // .then(function(more_results){
            //first_name = more_results.first_name;
            //last_name = more_results.last_name;
          //  console.log(first_name)
            res.render('books', {
            title: 'Galvanize-Reads',
            data: data
            })
          });
  //  }
    //})
});

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
