const {Book} = require('./model/Book')
const {Author} = require('./model/Author')
const {books,authors}= require('./data')
const connectToDB = require('./config/db')
require('dotenv').config()
connectToDB()
//import books
const importBooks = async ()=>{
    try{
        await Book.insertMany(books)
        console.log('books imported')
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
//import authors
const importAuthors = async ()=>{
    try{
        await Author.insertMany(authors)
        console.log('authors imported')
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
//remove books
const removeBooks = async ()=>{
    try{
        await Book.deleteMany()
        console.log('books deleted')
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
const removeAuthors = async ()=>{
    try{
        await Author.deleteMany()
        console.log('authors deleted')
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
if(process.argv[2] === "-import"){
    importBooks()
}else if(process.argv[2] === "-remove"){
    removeBooks()
}else if (process.argv[2] === "-import-authors"){
    importAuthors()
}else if(process.argv[2] === "-remove-authors"){
    removeAuthors()
}
