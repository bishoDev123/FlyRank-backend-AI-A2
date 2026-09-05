const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const db = require('./db');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
        },
    },
    apis: ['server.js'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.get("/", (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
});

app.get("/health", (req, res) => {
    res.status(200).send("Status is OK (200)");
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of all tasks
 */
app.get("/tasks", (req, res) => {
    res.json(db.getAllTasks());
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task id
 *     responses:
 *       200:
 *         description: The matching task
 *       404:
 *         description: Task not found
 */
app.get("/tasks/:id", (req, res) => {
    const task = db.getTaskById(req.params.id)

    if (!task) {
        return res.status(404).json([{ error: "task not found" }])
    }

    res.json(task);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             example:
 *               title: Buy milk
 *     responses:
 *       201:
 *         description: The created task
 *       400:
 *         description: Missing title
 */
app.post("/tasks", (req, res) => {

    if (!req.body.title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const newTask = db.createTask(req.body.title);

    res.status(201).json(newTask);
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated task
 *       400:
 *         description: Invalid task
 *       404:
 *         description: Task not found
 */
app.put("/tasks/:id", (req, res) => {
    const {
        body: { title, done },
        params: { id }
    } = req;

    let task = db.getTaskById(id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    if (task == "") {
        return res.status(400).json({ error: "task is required" });
    }

    task = db.updateTask(title, done, id);
    res.json(task);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task id
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
app.delete("/tasks/:id", (req, res) => {
    const { params: {id} } = req
    const task = db.getTaskById(id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    db.deleteTask(id);
    res.sendStatus(204);
});

app.listen(3000);