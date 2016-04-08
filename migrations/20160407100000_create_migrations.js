exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments('book_id');
    table.string('title');
    table.string('genre');
    table.text('description');
    table.string('cover_url')
  })
  .createTable('authors', function(table){
    table.increments('author_id');
    table.string('first_name');
    table.string('last_name');
    table.text('biography');
    table.string('portrait_url')
  })
  .createTable('authors_books', function(table){
    table.integer('book_id').unsigned().references('books.book_id').onDelete('cascade').onUpdate('cascade');
    table.integer('author_id').unsigned().references('authors.author_id').onDelete('cascade').onUpdate('cascade');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('books')
    .dropTable('authors')
    .dropTable('authors_books')
};
