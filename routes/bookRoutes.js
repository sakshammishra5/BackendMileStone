const express=require("express");
const { getAllBooks, getBookById, postBook, updateBook, deleteBook } = require("../controllers/book");
const verifyToken = require("../middleware/authMiddleware");
const router=express.Router();

router.get("/books",getAllBooks)

router.get("/books/:id",getBookById)

router.post("/books",verifyToken,postBook)

router.put("/books/:id",verifyToken,updateBook)

router.delete("/books/:id",verifyToken,deleteBook)

module.exports=router