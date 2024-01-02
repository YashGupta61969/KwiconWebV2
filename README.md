# Kwicon Web Version: 2.0.0

This whole project is built with NX build system. We recommend following the [NX Documentation](https://nx.dev/react/getting-started/intro) to get started.

This mono-repo contains the following apps:

- [Kwicon Web App](./apps/kwicon-app/)
- [Kwicon Website](./apps/kwicon-website/)

### Table of Contents

- [Kwicon Web Version: 2.0.0](#kwicon-web-version-200)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Tech Stack](#tech-stack)
  - [Running the app](#running-the-app)
  - [Project Structure](#project-structure)
    - [Graph Representation](#graph-representation)
  - [Learn More](#learn-more)

## Getting Started

Kwicon is an application for students, which allows them to communicate, seek help, join events and communities to get help with their studies. In short, it is a social media platform for students.

#### Tech Stack

- [Architecture: Micro Frontend (Integrated Mono-Repo)](https://martinfowler.com/articles/micro-frontends.html)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Frontend Framework: [React](https://reactjs.org/)
- UI Framework: Custom KwiconUI
- Build System: [NX](https://nx.dev/)
- Bundler: [Vite](https://vitejs.dev/)
- Transpiler: [Babel](https://babeljs.io/)
- Unit Test: [Jest](https://jestjs.io/)
- E2E Test: [Cypress](https://www.cypress.io/)
- Linter: [ESLint](https://eslint.org/)
- Formatter: [Prettier](https://prettier.io/)
- State Management: [Redux Toolkit](https://redux-toolkit.js.org/)
- Data Fetching: [Axios](https://axios-http.com/)

## Running the app

We are recommended to use **pnpm** to install dependencies and run scripts. Please install `pnpm` first by following the [official guide](https://pnpm.io/installation). As we are using NX, it would be better to install it globally by running `npm i -g nx`. Then install the NX extension for VSCode by following the [official guide](https://pnpm.io/installation).

After installing the required tools, clone the repository. Then proceed to the following steps:

First thing first, always create (checkout) a new branch from the development branch. The branch name should be in the format of <your-name>/<#-of-your-story or feature name>. Optionally, you can add your working feature or bugfix to the branch name, like <your-name>/<#-of-your-story>/bug-fix|feature. This is to make it easier to track the changes. Remember to add # of your story to the commit first then your commit message. For example, #10002 user story: Completed #1234 task -> Added a cool feature. Follow the best naming convention from the following [guide](https://www.conventionalcommits.org/en/v1.0.0/). We strongly recommend following the naming convention.

1. Install dependencies.

```bash
pnpm install
```

```bash
nx run kwicon-app:serve # to run the kwicon web

#----

nx run kwicon-website:serve # to run the kwicon website
```

2. Build the app.

```bash
nx run kwicon-app:build # to build the kwicon web

#----

nx run kwicon-website:build # to build the kwicon website
```

## Project Structure

Below one is the minimal representation of the project structure. Since the app is still in development, the structure may change in the future.

```bash
|-- apps
|   |-- kwicon-app # code for the kwicon web application
|   |-- kwicon-ui-e2e # e2e test for the kwicon ui library
|   |-- kwicon-website # code for the kwicon website
|-- libs
|   |-- commons # common code for the apps
|   |   |-- config
|   |   |-- constants
|   |   |-- hooks
|   |   |-- media
|   |   |-- providers
|   |   |-- types
|   |   |-- utils
|   |-- components # reusable components
|   |-- features # features for the apps
|   |-- kwicon-ui # ui library for the apps
|   |-- routes # routes for the apps

```

#### Graph Representation

![Graph Representation](./docs/kwicon-project-graph.png)

## Learn More

Please go through the following links to learn more about the project.

- [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [NX Cheat Sheet](./docs/NX_CHEATSHEET.md)
- [Changelog](./docs/CHANGELOG.md)
- [Development Philosophies](./docs/DEVELOPMENT_PHILOSOPHIES.md)

## .env

```bash
VITE_API_URL=https://kwicondev.techdome.io/api/v2

VITE_IMAGE_SAS_TOKEN=sp=racwdl&st=2023-03-29T09:05:48Z&se=2025-03-31T17:05:48Z&sv=2021-12-02&sr=c&sig=5S0P07dn1dmpyqLUIWWrOOqshOgf7IHtEL%2B212hCsFA%3D

VITE_APP_AUTH0_DOMAIN=dev-ljc83qoofj2auuhg.us.auth0.com

VITE_APP_AUTH0_CLIENT_ID=fI0BqRqnS2BnhXPn1pJ1pJZLd2wQuWwL

VITE_APP_URL=http://localhost:4400/

VITE_WEBSITE_URL=http://localhost:4200/

VITE_QB_APP_ID=100301

VITE_QB_AUTH_KEY=p2E5w-3qfc6ymdd

VITE_QB_AUTH_SECRET=QxexY67cEM6OrNE

VITE_QB_ACCOUNT_KEY=Dxh_pf9dqgw5BEEZLab4

VITE_FIREBASE_API_KEY=AIzaSyBreftXO2zQZA4ENo7OOWYVjtLiXBZ7FF4

VITE_FIREBASE_AUTH_DOMAIN=kwicon-383009.firebaseapp.com

VITE_FIREBASE_PROJECT_ID=kwicon-383009

VITE_FIREBASE_STORAGE_BUCKET=kwicon-383009.appspot.com

VITE_FIREBASE_MESSAGING_SENDER_ID=44047846137

VITE_FIREBASE_APP_ID=1:44047846137:web:e9f9bee2ac919fb6d93028

VITE_FIREBASE_MEASUREMENT_ID=G-40N8EYMNNC

VITE_FIREBASE_VAPI_KEY=BHDiTnG9U68mh67xuINj_oBnxtD5SKstD793QZGVHXqS9lp1_GsoZUsYirIoivHZlEuRSGfFNDyOjs3Bk82iZyA
```