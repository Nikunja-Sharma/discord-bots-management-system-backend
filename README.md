
# Discord Bot Management System

This is a Discord bot management system built with Node.js, Express, and MongoDB. It allows users to manage multiple Discord bots, store their details in a MongoDB database, and perform operations such as starting, stopping, and retrieving bot information.

## Features

- Start and stop multiple Discord bots
- Store bot details (name, avatar URL, ID, and tag) in a MongoDB database
- Retrieve a list of active bots
- Fetch all bot details from the database

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Start a New Bot](#start-a-new-bot)
  - [Stop an Existing Bot](#stop-an-existing-bot)
  - [List Active Bots](#list-active-bots)
  - [Get All Bots](#get-all-bots)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **Node.js**: JavaScript runtime built on Chrome's V8 engine
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing bot details
- **Discord.js**: Powerful library for interacting with the Discord API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/discord-bot-management.git
   cd discord-bot-management
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://<username>:<password>@host:port/database
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

## Usage

Once the application is running, you can interact with it using the defined API endpoints.

## API Endpoints

### Start a New Bot

- **Endpoint**: `POST /api/bots/start`
- **Description**: Start a new Discord bot using the provided token and store its details in the database.
- **Request Body**:
  ```json
  {
    "token": "YOUR_BOT_TOKEN"
  }
  ```
- **Response**:
  - **201 Created**: Bot started successfully and details saved.
  - **500 Internal Server Error**: Failed to start the bot.

### Stop an Existing Bot

- **Endpoint**: `POST /api/bots/stop`
- **Description**: Stop a running bot using its token.
- **Request Body**:
  ```json
  {
    "token": "YOUR_BOT_TOKEN"
  }
  ```
- **Response**:
  - **200 OK**: Bot stopped successfully.
  - **500 Internal Server Error**: Failed to stop the bot.

### List Active Bots

- **Endpoint**: `GET /api/bots/list`
- **Description**: Get a list of currently active bots.
- **Response**:
  - **200 OK**: Returns an array of active bot tokens.
  ```json
  [
    "YOUR_BOT_TOKEN_1",
    "YOUR_BOT_TOKEN_2"
  ]
  ```

### Get All Bots

- **Endpoint**: `GET /api/bots/all`
- **Description**: Retrieve details of all stored bots in the database.
- **Response**:
  - **200 OK**: Returns an array of bot details.
  ```json
  [
    {
      "_id": "60c72b2f9f1b2c001f6d1b72",
      "token": "YOUR_BOT_TOKEN",
      "botName": "BotName",
      "botAvatar": "https://example.com/avatar.png",
      "botId": "123456789012345678",
      "botTag": "BotName#1234",
      "__v": 0
    },
    ...
  ]
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
