// seedBooks.js
const mongoose = require('mongoose');
const Book = require('./models/Book'); // Adjust path if needed
require('dotenv').config()
// ------------------------------------------------------------------
// 1. CONNECTION
// ------------------------------------------------------------------
const MONGO_URI = process.env.MONGODB_URI; // Change to your DB name
// For Atlas:
// const MONGO_URI = 'mongodb+srv://<user>:<pass>@cluster0.mongodb.net/bookstore';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });

// ------------------------------------------------------------------
// 2. OPTIONAL: CLEAR EXISTING DATA
// ------------------------------------------------------------------
async function clearCollection() {
  try {
    await Book.deleteMany({});
    console.log('Old books cleared');
  } catch (err) {
    console.error('Error clearing collection:', err);
  }
}

// ------------------------------------------------------------------
// 3. SEED 10 BOOKS
// ------------------------------------------------------------------
const seedBooks = async () => {
  await clearCollection(); // Uncomment to wipe existing data

  const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      price: 10.99,
      inStock: true
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      price: 8.99,
      inStock: true
    },
    {
      id: 'B003',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      price: 12.50,
      inStock: false
    },
    {
      id: 'B004',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      price: 9.75,
      inStock: true
    },
    {
      id: 'B005',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      price: 14.99,
      inStock: true
    },
    {
      id: 'B006',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Dystopian',
      price: 11.25,
      inStock: false
    },
    {
      id: 'B007',
      title: 'Moby-Dick',
      author: 'Herman Melville',
      genre: 'Adventure',
      price: 13.80,
      inStock: true
    },
    {
      id: 'B008',
      title: 'War and Peace',
      author: 'Leo Tolstoy',
      genre: 'Historical',
      price: 19.99,
      inStock: true
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Coming-of-age',
      price: 10.49,
      inStock: false
    },
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      price: 15.99,
      inStock: true
    }
  ];

  try {
    const result = await Book.insertMany(books);
    console.log(`Successfully seeded ${result.length} books!`);
  } catch (err) {
    console.error('Error seeding books:', err);
  } 
};

// ------------------------------------------------------------------
// 4. RUN
// ------------------------------------------------------------------
seedBooks();