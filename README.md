# Portfolio Backend v2.0.0

This repository contains the backend code for the second version of my portfolio. Built with NestJS and TypeScript, this backend powers the API and handles server-side operations, including email functionality and configuration management.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Docker Integration](#docker-integration)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)

---

## Features

- **API Development**: RESTful APIs built with NestJS.
- **Email Sending**: Configured via Nodemailer with SMTP credentials.
- **Validation**: `class-validator` and `class-transformer` for DTO validation.
- **Configuration Management**: Centralized using `@nestjs/config`.
- **TypeScript Support**: Fully typed codebase for better developer experience.
- **Testing**: Unit and end-to-end testing with Jest.
- **Dockerized Deployment**: Easily deployable using Docker.

---

## Technologies

- **Backend Framework**: NestJS
- **Language**: TypeScript
- **Email**: Nodemailer
- **Validation**: class-validator, class-transformer
- **Testing**: Jest, Supertest

---

## Prerequisites

Make sure you have the following installed:

- Node.js (>= 18.x)
- npm (>= 9.x) or pnpm
- Docker (for containerized deployment)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jszigeti/portfolio-v2-backend.git
   cd portfolio-v2-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start:dev
   ```

4. Access the backend API at `http://localhost:3000`.

---

## Scripts

| Command            | Description                                  |
|--------------------|----------------------------------------------|
| `npm run build`    | Build the project for production            |
| `npm run start`    | Start the production server                 |
| `npm run start:dev`| Start the development server                |
| `npm run start:debug` | Start the server in debug mode           |
| `npm run lint`     | Lint the codebase using ESLint              |
| `npm run format`   | Format the code using Prettier              |
| `npm run test`     | Run unit tests with Jest                    |
| `npm run test:watch` | Watch for changes and re-run tests         |
| `npm run test:cov` | Run tests and generate coverage report      |
| `npm run test:e2e` | Run end-to-end tests                        |

---

## Environment Variables

Create a `.env` file in the root directory and define the following variables:

```env
SMTP_USER=<your_smtp_username>
SMTP_PASS=<your_smtp_password>
CONTACT_RECEIVER=<your_mail_receiver>
FRONT_URL=<your_frontend_url>
PORT=3000
```

---

## Docker Integration

This project includes a `Dockerfile` for containerized deployment. To build and run the application using Docker:

1. Build the Docker image:

   ```bash
   docker build -t portfolio-backend:v2 .
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 3000:3000 --env-file .env portfolio-backend:v2
   ```

3. Access the API at `http://localhost:3000`.

---

## Project Structure

```
portfolio-backend/
├── src/                    # Application source code
│   ├── contact             # Contact folder with module, controller, and service for handling contact-related logic
│   ├── app.module.ts       # Main application module that organizes the core structure and imports other modules
│   ├── main.ts             # Application entry point that initializes the NestJS app and starts the server
├── .dockerignore           # Specifies files and directories to ignore when creating a Docker image
├── .env                    # Environment variables file storing configuration secrets and API keys
├── .eslintrc.js            # ESLint configuration file for enforcing code quality and consistency
├── .gitignore              # Specifies files and directories to ignore in version control
├── .prettierrc             # Prettier configuration file for code formatting rules
├── Dockerfile              # Docker configuration file for building and running the application container
├── nest-cli.json           # NestJS CLI configuration file for project-specific settings
├── package.json            # Project metadata, scripts, and dependencies
├── README.md               # Project documentation and usage instructions
├── tsconfig.build.json     # TypeScript configuration for building the application
└── tsconfig.json           # TypeScript configuration for the development environment
```

---

## Testing

Run unit tests:

```bash
npm run test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Generate coverage report:

```bash
npm run test:cov
```

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your proposed changes.

---
