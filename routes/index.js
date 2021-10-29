const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Book = require("../models/book");

const schema = Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    hidden: Joi.boolean(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     NewBook:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The Boook's name.
 *           example: Half Girlfriend
 *         author:
 *           type: string
 *           description: The Author's name.
 *           example: Cheatn Bhagat
 *     Book:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The Book ID.
 *               example: 0
 *             hidden:
 *               type: boolean
 *               description: Visiblity of the book
 *               example: false
 *             dateCreated:
 *               type: date
 *               description: The Date when Book Created.
 *               example: 1950-01-01T00:00:00
 *         - $ref: '#/components/schemas/NewBook'
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books.
 *     description: Retrieve a list of books from database.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 */
router.get("/books", async (req, res, next) => {
    try {
        const items = await Book.find({});
        res.json(items);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /api/book/{id}:
 *   get:
 *     summary: Retrieve a single book.
 *     description: Retrieve a single book from database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: objectID of the book to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 */
router.get("/book/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await Book.findOne({ _id: id });
        if (!item) return next();
        res.json(item);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /api/books:
 *   post:
 *     summary: Create a book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 */
router.post("/books", async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await Book.create(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /api/book/{id}:
 *   put:
 *     summary: Update a book.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: objectID of the book to retrieve.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *     responses:
 *       201:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 */
router.put("/book/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await Book.findOne({ _id: id });
        if (!item) return next();
        await Book.updateOne({ _id: id }, { $set: value });
        res.json(value);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 *  /api/book/{id}:
 *   delete:
 *     summary: Delete a book.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: objectID of the book to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   message: 'Success'
 */
router.delete("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Book.remove({ _id: id });
        res.status(200).send({ message: "Sucess" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
