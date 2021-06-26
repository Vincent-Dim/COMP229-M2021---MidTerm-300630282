// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) 
    {
      return console.error(err);
    }
    else 
    {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('book/add', {title: 'Add Book'})
});

    /*****************
     * ADD CODE HERE done *
     *****************/



// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let createBook = book({
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  });

    book.create(createBook, (err, book) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/books');

        }
        
    });


});


    /*****************
     * ADD CODE HERE done *
     *****************/



// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;  

    book.findById(id, (err, bookToEdit) => {

        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.render('books/edit', {title: 'Edit Book', book: bookToEdit})
        }
    })

  res.render('books/add', {title: 'Add Book'})

});
  
  
   /* console.log(req.params.id);
    book.findById(req.params.id.value,(err, books) => {
        if (err) 
        {
            return console.error(err);
        } 
        else 
        {
            res.render('books/details', {
                title: "Edit Book",
                books: book,
                Title: book.Title,
                Description: book.Description,
                Price: book.Price,
                Author: book.Author,
                Genre: book.Genre
            });
        }
    });

    /*****************
     * ADD CODE HERE *
     *****************/
});*/

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {





}




    /*****************
     * ADD CODE HERE done *
     *****************/


     /*const createBook = new book({
      Title: req.body.title_txt,
      Description: "",
      Price: req.body.price_txt,
      Author: req.body.author_txt,
      Genre: req.body.genre_txt
  });
  createBook.save().then(() => console.log('book saved !'));
  book.find((err, books) => {
      if (err) 
      {
          return console.error(err);
      } 
      else 
      {
          res.render('books/index', {
              title: 'Books',
              books: books
          });
      }
  });

});*/

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => 
{
  
  let id = req.params.id;

  book.remove({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //refresh the book list
          res.redirect('/books');
      }
  });


    /*****************
     * ADD CODE HERE done*
     *****************/
    
    
});



module.exports = router;
