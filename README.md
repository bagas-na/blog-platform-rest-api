# Blog Platform REST API

This is a RESTful API built to manage a blog platform, providing endpoints to create, read, update, and delete blog posts. Part of [roadmap.sh](https://roadmap.sh) backend projects, [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api).

## Features

- **CRUD operations** for blog posts
- **JSON-based** API for data exchange
- Local SQLite database integration
- Type-safe with TypeScript

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or above)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/bagas-na/blog-platform-rest-api.git
    cd blog-platform-rest-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Setup the database:**

    The database is SQLite. To initialize the database using the migration files defined on ./drizzle folder:

    ```bash
    npm run migrate
    ```

    The database will be created in the ./data folder.

4. **Start the server:**

    ```bash
    npm start
    ```

    The API will be available at `http://localhost:3000`.

### API Endpoints

- **GET /article/:id** - Get an article by its ID
- **POST /admin/article/new** - Create a new article
- **PUT /admin/article/:id** - Update an article by its ID
- **DELETE /admin/article/:id** - Delete an article by its ID

## Built With

- [Node.js](https://nodejs.org/)
- [SQLite](https://sqlite.org/) as [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [Drizzle ORM](https://drizzle.team/)

## License

This project is licensed under the MIT License.


