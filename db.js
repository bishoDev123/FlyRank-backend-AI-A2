const Database = require('better-sqlite3');
const db = new Database('tasks.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT 0
    )
`);

const seedCount = db.prepare(`SELECT COUNT(*) AS count FROM tasks`).get().count;

console.log(seedCount);

if (seedCount === 0) {
    const insert = db.prepare(`INSERT INTO tasks (title, done) VALUES (?, ?)`);
    insert.run("walk the dog", 0);
    insert.run("take out the trash", 0);
    insert.run("take a shower", 1);
}

function getAllTasks({ search, status } = {}) {
    let query = "SELECT * FROM tasks";
    const conditions = [];
    const params = [];

    if (search) {
        conditions.push("title LIKE ?");
        params.push(`%${search}%`);
    }
    if (status !== undefined) {
        conditions.push("done = ?");
        params.push(status === "done" ? 1 : 0);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    return db.prepare(query).all(...params);
}

function getTaskById(id) {
    return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
}

function createTask(title) {
    const result = db.prepare("INSERT INTO tasks (title) VALUES (?)").run(title);
    return getTaskById(result.lastInsertRowid);
}

function updateTask(title, done, id) {
    db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(title, done, id);
    return getTaskById(id);
}

function deleteTask(id) {
    db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
}

module.exports = {
    db,
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};