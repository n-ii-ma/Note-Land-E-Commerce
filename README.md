[![MIT License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

# Note Land E-Commerce

A PERN stack E-Commerce application implementing Material UI 5.

## Table of contents
+ [General Info](#general-info)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [Features](#features)
+ [Screenshot](#screenshot)
+ [Acknowledgements](#acknowledgements)
+ [License](#license)
+ [Contact](#contact)

## General Info
A fully-functioning e-commerce application that allows users to register an account, browse products for sale, and complete a purchase.

## Technologies
Project is created with:
+ React v18.1.0
+ React-Redux v8.0.1
+ Redux Toolkit v1.8.1
+ Material UI v5.6.4
+ express v4.17.3
+ node.js v16.14.2
+ npm v8.5.0
+ PostgreSQL v14.2

## Setup

### Installation
To run this project, install it locally using npm in both `client` and `server` folders:
```
$ cd ../server
$ npm install
$ npm run dev
...
$ cd ../client
$ npm install
$ npm start
```
### Environment Variables
After installation, you will need to add the following environment variables to your `.env` file in the `server` directory:

- `DB_USER` : PostgreSQL user

- `DB_PASSWORD` : Password of that user

- `DB_HOST` : Hostname of the database

- `DB_PORT` : PostgreSQL port

- `DB_DATABASE` : Name of the database

- `SECRET` : Session secret

- `STRIPE_SECRET_KEY` : Stripe API secret key

## Features
- Register an account
- Browse a set of products
- Add products to cart
- Check out cart and place an order
- View order history

## Screenshot
![image](https://user-images.githubusercontent.com/88039431/171991550-38f2e0a4-18df-4960-93d5-848257287713.png)

## Acknowledgements
- This project was based on [Codecademy](https://www.codecademy.com/)'s full-stack portfolio project in the Full-Stack Engineer Career Path.
- Samsung Galaxy Note smartphones' info was taken from [GSMArena](https://www.gsmarena.com/) and [PhoneArena](https://www.phonearena.com/).

## License
Distributed under the [MIT](https://opensource.org/licenses/MIT) License.

## Contact
Created by [n-ii-ma](https://github.com/n-ii-ma)

Feel free to contact me!
