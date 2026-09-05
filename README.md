## Todo list API in Express JS
This is a Todo list API made in the Express framework with all the specifications made in A1 of the Backend AI track at FlyRank AI.

----------
#### Installation:
Download the full code, and after extracting it run `npm init` and `npm run dev` and nodemon will start up the server, and you should be good to go

----------
#### API endpoints:

| Method | Endpoint      | Description                     | Request Body                          | Success Response          | Error Response(s)                          |
|--------|---------------|----------------------------------|----------------------------------------|----------------------------|---------------------------------------------|
| GET    | `/`           | API info and available endpoints | —                                      | `200 OK`                  | —                                             |
| GET    | `/health`     | Health check                     | —                                      | `200 OK`                  | —                                             |
| GET    | `/tasks`      | Get all tasks                    | —                                      | `200 OK` — array of tasks | —                                             |
| GET    | `/tasks/:id`  | Get a single task by id          | —                                      | `200 OK` — task object    | `404 Not Found` — task doesn't exist         |
| POST   | `/tasks`      | Create a new task                | `{ "title": "string" }`               | `201 Created` — new task  | `400 Bad Request` — missing/empty title      |
| PUT    | `/tasks/:id`  | Update an existing task          | `{ "title": "string", "done": bool }` | `200 OK` — updated task   | `400 Bad Request`, `404 Not Found`           |
| DELETE | `/tasks/:id`  | Delete a task by id              | —                                      | `204 No Content`          | `404 Not Found` — task doesn't exist         |
----------
#### Example Curl output:
```
  curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40
ETag: W/"28-PpSBYV7i68cXyGc7AhjVpkZkY5Q"
Date: Fri, 28 Aug 2026 21:30:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":4,"title":"Buy milk","done":false}
```
This is the curl output of the post method with just the title.

----------

#### Swagger UI:

<img width="1893" height="913" alt="image" src="https://github.com/user-attachments/assets/786a785c-1295-4380-8fcf-dd1a26885ebe" />

This is the Swagger UI made using Swagger-jsdocs. <br>
`Transparency notes: The actual integration of the Swagger UI is handmade, the documentation itself was done using a claude project`

----------

#### SQLite:

**Why**:
- A small application not build to scale benefits from a small and easy-to-work-with database
- One file has all the information you need
- Uses familiar SQL syntax
- Setup is quick, and tools are free

**Code**:
- `Tasks.db` is the file containing the database itself, while abstraction is done in `db.js`

**Database in tableplus (tool of choice)**:
<img width="1919" height="1018" alt="image" src="https://github.com/user-attachments/assets/0e2f6883-353b-4a10-991c-121acffbbca2" />

**Example query from stage 4**:

<img width="541" height="282" alt="image" src="https://github.com/user-attachments/assets/29ad5932-cedc-45a6-8c81-b1e0446264c0" />
