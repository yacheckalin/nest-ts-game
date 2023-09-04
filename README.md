## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Technical Debt

TESTING

- [**] add unit tests
- [**] add e2e tests
- [**] add test/dev environment

BUSINESS FLEXIBILITY

- as a player I want to be able to be involved into several games at a time (Many-To-Many)
- add more statuses (only when game is starting, player status will be 'playing')

- change sqlite for PostgreSQL (add docker-composer)

MVP

- add WebSockets (add redis-adapter / socket.io platform)
- refactor services (move reusable code)
- remove all hard-code (constants)
- [**] add Swagger for the documentation

UI

- add authentification (login page for client)
- user apply for the available game manualy (UI)
- game manager (UI)

## Use cases

Actors: [client]

- as a client, I want to be able to initialize as a player for first not completed/non-started game (the game with the empty slots in the players pool)
- as a client, I want to be able initialize once (any refresh of the page will give the same GAME_ID, PLAYER_ID statuses)
- game will start automaticaly when the players pool will be fullfiled
- as a client, I want to see values from the moves of other players
- as a client, I want to be informed whos WINN

## API

[>> API DOCUMENTATION HERE <<](http://localhost:3000/api)

## License

Nest is [MIT licensed](LICENSE).
