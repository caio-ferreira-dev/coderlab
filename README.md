# Coder Lab - Technical Test

This repository contains an App built with **NestJS** and **ViteJS + React** as part of a technical test provided by **Coder Lab**

## Technologies Used

The following technologies were used to build the application:

### As Requested, the following were used:

- **NodeJS**: ^20.17.0
- **NestJS**: 11.0.1
- **Prisma**: 6.6.0
- **Vite**: 6.3.1
- **ReactJS**: 19.0.0
- **MySQL**: 8.0

### Additional Libraries:

- **ShadcnUI** | UI component library, chosen for its simplicity of use and high performance due to how the components are imported.
- **framer-motion** | CSS animation library, chosen for its low complexity and ease of applying classic interface animations to any element/component.
- **Swagger** | API documentation library, chosen for its ease in generating semi-automatic documentation based on decorators and DTOs for each created endpoint.
- **class-validator** | Request parameter/body validation library, chosen to simplify the verification/typing of parameters and bodies of requests made to each endpoint.

## Setup

_This application uses MySQL as the database, but you can modify the configurations in the `.env` file if you wish to use Postgres._

### Running the Application with Docker Compose

To run both the application and the MySQL database in Docker containers, follow these steps:

1. **Ensure you're in the project root folder, where the `docker-compose.yml` file is**, which defines both the application and the MySQL database services.

2. **Run the following command to build and start both containers** (application and database):

   ```bash
   docker-compose up --build -d
   ```

3. This will start the application and MySQL containers in detached mode.

4. The database data will be saved in a docker volume "mysql_data", that will be locally managed by docker.

5. **Access the project [home page](http://localhost:4173) and the [api docs](http://localhost:3000/docs), setted up with docker**

### Stopping and Removing Docker Containers

To stop and remove the Docker containers, follow these steps:

1. **Stop the running containers**:

   ```bash
   docker-compose down
   ```

2. **Remove the stopped containers and volumes** (optional):
   ```bash
   docker-compose down --volumes
   ```

### Manual Installation Steps

1. **Clone or fork this repository** to your local machine.
2. **Open your terminal** and ensure you're in the project root before running the following commands.

3. **Navigate to "backend" folder and install the dependencies**:

   ```bash
   cd ./backend && npm i
   ```

4. **Create the `.env` file and setup prisma/database**:

   - Rename the `.env.example` file to `.env`.
   - Modify the following variable according to your setup:

   ```env
   DATABASE_URL="db://dbuser:dbpassword@host:port/dbname"
   ```

5. **Generate the prisma client and run the database migrations**:

   ```bash
   npx prisma generate && npx prisma migrate deploy
   ```

6. **Build and start the backend application**:

   ```bash
   npm run build && npm run start:prod
   ```

7. **Open another terminal at the project's root and switch to the frontend folder and install the dependencies**

   ```bash
   cd ./frontend && npm i
   ```

8. **Build and start the frontend application**:

   Production environment setup:

   ```bash
   npm run build
   npm install -g serve
   serve -s dist -p 3001
   ```

9. **Access the project [home page](http://localhost:3001) and the [api docs](http://localhost:3000/docs), setted up manually**

### Lastly, any feedback is welcome and very important! If possible, please get in touch with me.
