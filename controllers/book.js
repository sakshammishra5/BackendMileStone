const Book = require("../models/Book")

module.exports.getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find()
        if (allBooks.length > 0) {
            res.status(200).json(allBooks)
        }

    } catch (error) {
        res.status(404).error(error)
    }
}

module.exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const book = await Book.findOne({ _id:id })
        console.log(book)
        if (book) {
            res.status(200).json(book)
        }
        else{
          res.status(404).json({message:"Book not found"})
        }

    } catch (error) {
        res.status(404).json({error})
    }
}

module.exports.postBook = async (req, res) => {
    try {
        const data = req.body;

        // Validate required field
        if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
            return res.status(400).json({ message: "A valid 'title' is required" });
        }

        // Check for existing book
        const existingBook = await Book.findOne({ title: data.title });
        if (existingBook) {
            return res.status(409).json({ message: "Book with this title already exists" });
        }

        // Create book — spread the fields correctly
        const newBook = await Book.create(data);

        return res.status(201).json({
            message: "Book created successfully!",
            book: newBook
        });

    } catch (error) {
        console.error("Error creating book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );


        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }


        res.status(200).json(updatedBook);

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format (optional but recommended)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }

    // Delete the book
    const result = await Book.deleteOne({ _id: id });

    // Check if a document was actually deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Success: 204 No Content is standard for DELETE
    return res.status(204).send(); 
    // OR if you want to send a message:
    // return res.status(200).json({ success: true, message: 'Book deleted' });

  } catch (error) {
    console.error('deleteBook error:', error);

    // Handle CastError (invalid ID) specifically
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};