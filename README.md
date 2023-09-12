**CURRENT VERSION: 1.0.1**

## Description

When a player starts, it incepts a random (whole) number and sends it to the second player as an approach to starting the game.
The receiving player can now always choose between adding one of {-1, 0, 1} to get to a number that is divisible by 3. Divide it by three. The resulting whole number is then sent back to the original sender.
The same rules are applied until one player reaches the number 1 (after the division).

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

## Stack

This application is implemented by:

<div>Typescript</div>
<div>Nest.js</div>
<div>TypeORM</div>
<div>SQLite</div>
<div>Jest</div>
<div>Socket.io</div>
<div>REST API</div>

## High-level architecture

![high-level architecture](/client/sockets-diagram.png)

## DB Relations

**Game.Entity**

```javascript
 id: number;
 maxPlayer: number;
 createdAt: Date;
 startedAt: Date;
 endedAt: Date;
 winner: number;
 players: Players[];
```

**Player.Entity**

```javascript
 id: number;
 nickName: string;
 createdAt: Date;
 game: Game;
 move: Moves[];
```

**Moves.Entity**

```javascript
id: number;
game: Games;
player: Players;
value: number;
createdAt: Date;
```

## The flow

- create the game and specify max number of players
- create the player
  > Will be done automaticaly in the version 1.0.0 when the client has been initialized
- add current player to the first available game
  > first game with at least one empty place in the players pool will be considered as available
- start the game
  > This step can be instantiated manualy in the version 1.0.0
- make a move if it is your turn

## Player Statuses

- PENDING
- WAITING
- PLAYING

**PENDING** is initial status for each player in the system. When you register in the system this status automaticaly will be assigned.

**WAITING** is status of player who is waiting for beginning of the game (addPlayerToGameById)

**PLAYING** is status assigned when the game has begun and this player is taking part in it.

> When the player is added to the game his status will be changed to **WAITING** <br/>
> When the player will be leaving the game, his status will be changed to **PENDING**<br/>
> When the game has overed statuses of all involved players will be changed to **PENDING**

## Non-happy pathes (Exceptions - 404, 400, 500)

**Add to the game pool**

- if player has already in the game pool
- if game pool is fullfiled
- if game has already been started and you try to add to the game pool
- if game has already ended (and we have a winner)
- if there is no player with such ID

**Start the game**

- if the game is already ended
- if the game is not exists
- if the game pool is not fullfiled yet
- if the game has already started

**Stop the game**

- if the game is not started yet
- if the game is not exists

## Use cases

Actors: [client]

- as a client, I want to be able to jump into the existing game
- as a client, I want to be able to make a move
- as a client, I want to see values from the moves of other players
- as a client, I want to be informed whos WINN

## API Documentation

Swagger API documentation is available by:

`http://localhost:3000/api`

## Versions History

##### 1.0.0

- players API
  - create player
  - update existing player
  - get player info by ID
  - get all players
  - get first "not busy in a game" (status: PENDING)
- games API
  - create new game
  - edit existing game
  - add new player to the game
  - remove player from the game
  - start game
  - stop game
  - get game info by ID
  - get all games
  - get first available game
  - make move
- client
  - no UI
  - semi-automatical logic for initializing the player (no login)
  - INIT_PLAYER, INIT_GAME, MAKE_MOVE is manualy instantiated from the client side

##### 1.0.1 --> CURRENT

- change DB to PostgreSQL (add docker-compose for local implementation)

##### 1.0.2

- one player can be involved into several games at a time
  > add active_games table (for Many-To-Many relations between players & games)

##### 1.0.3

- add "rooms" entity
  > should store information about socket-connection and link any new connection to the existing room
- broadcast only for specific room, related to the active game

##### 1.1.0

- add Next.js for UI part

##### 1.1.1

- add Login (UI + BE)
  > on authentification step Player will be instantiated (instead of status PENDING)

##### 1.1.2

- as a Player, I want to see all available games on the page and choose
- as a Player, I want to "make_move" on a new page (route: /make-move)

##### 1.1.3

- add more interective: progress bar, waiting for a next player move, notification that is your turn, etc ...

##### 1.2.1 ... and later

- add invitations to the game
- add scheduled games (delayed)
- add notifications before game
- anyone can create a game and send the invitation link via email
- add different game play strategies
  - make move in your turn
  - each player should make a move only once
  - make move in a cycle manier
  - make move in your turn and only once

## License

Nest is [MIT licensed](LICENSE).
