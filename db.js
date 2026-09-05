const Database = require('better-sqlite3');
const db = new Database('tasks.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT 0
    )
`);

const seedCount = db.prepare(`SELECT COUNT(*) AS count FROM tasks`).get().count;

console.log(seedCount);

if (seedCount === 0) {
    const insert = db.prepare(`INSERT INTO tasks (task, done) VALUES (?, ?)`);
    insert.run("walk the dog", 0);
    insert.run("take out the trash", 0);
    insert.run("take a shower", 1);
}

function getAllTasks() {
    return db.prepare("SELECT * FROM tasks").all();
}

function getTaskById(id) {
    return db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
}

function createTask(task) {
    const result = db.prepare("INSERT INTO tasks (task) VALUES (?)").run(task);
    return getTaskById(result.lastInsertRowid);
}

module.exports = {
    db,
    getAllTasks,
    getTaskById,
    createTask
};