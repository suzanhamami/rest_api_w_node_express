# 📚 REST API with Node.js & Express

A simple RESTful API built using Node.js and Express, with full CRUD operations and interactive API documentation using Swagger.

---

## 🚀 Live Demo

🔗 https://rest-api-w-node-express.onrender.com/api-docs

---

## 📌 Features

* Create, Read, Update, Delete (CRUD) operations
* Input validation using Joi
* RESTful API design
* Interactive API documentation with Swagger UI
* Modular route structure

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Joi (validation)
* Swagger (API documentation)

---

## 📂 Project Structure

```
project/
│
├── index.js
├── routes/
│   └── courses.js
└── README.md
```

---

## ⚙️ Installation & Setup

1. Clone the repository

```
git clone https://github.com/suzanhamami/rest_api_w_node_express.git
cd rest_api_w_node_express
```

2. Install dependencies

```
npm install
```

3. Run the server

```
node index.js
```

4. Open in browser

```
http://localhost:3000/api-docs
```

---

## 📖 API Endpoints

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | /api/courses     | Get all courses  |
| GET    | /api/courses/:id | Get course by ID |
| POST   | /api/courses     | Create a course  |
| PUT    | /api/courses/:id | Update a course  |
| DELETE | /api/courses/:id | Delete a course  |

---

## 🧪 Testing

You can test the API using:

* Swagger UI (recommended)
* Postman

---

## 💡 What I Learned

* Building REST APIs with Express
* Structuring backend projects using routes
* Validating input using Joi
* Documenting APIs using Swagger

---
