[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Azure Documentdb Localhost

`zure-documentdb-localhost` is an npm module which provides the utility of downloading azure documentdb emulator and setting up the local environment.

# Getting Started

## Installation

`npm install --save zure-documentdb-localhost`

## Usage

```
var documentdbEmulator = require('zure-documentdb-localhost');

//Download and install the documentdb emulator
documentdbEmulator.install();

//Starts the local server
documentdbEmulator.start();

//Stop the local server
documentdbEmulator.stop();

```

# Development

1. `git clone https://github.com/99xt/azure-documentdb-localhost.git`
2. `cd azure-documentdb-localhost`
3. `npm install` Install all the dependencies
4. `npm run test` Executes all the unit test cases

![image](https://user-images.githubusercontent.com/10680296/30747624-72226160-9fcb-11e7-9a4c-b948a3759b36.png)

## Linting

This project uses [eslint](https://eslint.org/) for linting JavaScript. The config is set to use the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

```
npm run lint
```

# Acknowledgement

This project was initiated through **Hacktitude**, An opensource competition organized by [@99XT](https://github.com/99XT) for undergraduates. As a part of the second round of the competition for the top ten contributors in the first round, ten new opensource projects were introduced and this project is one of them. I would like to thank [@99XT](https://github.com/99XT) for organizing this such of events for us which helps us to get more exposure. And my mentors [@AshanFernando](https://github.com/AshanFernando) [@rehrumesh](https://github.com/rehrumesh) who were guiding me during the two weeks of the journey to get this project a success, Thanks for everything.

# Contribute

As an opensource project, we really like to see you being interested in using this project and contributing us in any way. You can contribute to the project for enhancements, bug fixes, testing, documentation and etc. Please use GitHub issues for bugs and even for discussions or questions. And pull requests for code changes.
