## News Pay Per

#### What is it?

A project designed to mitigate the issue with newspaper subscriptions. Why subscribe to multiple newspapers when you might only read a handful of articles a week

The solution is a blockchain powered smart contract which allows the client to purchase an article on demand

#### How does it work?

The project consists of three sides: 
- The front end react application which acts as a viewing for the articles
- A node JS backend which serves the data and will ultimately hold the majority of smart contract logic
- A solidity smart contract which will keep reference of who has purchased which article, sorting the purchase information forever on the Ethereum blockchain  

#### The smart contract

I am using `truffle` to handle the semantics of running a local blockchain

To start the truffle server run `truffle develop`

Then compile and migrate the smart contract `compile` `migrate`

#### The backend

Running the backend application is simple. The application is stored under `./api`

`cd ./api`

To run `make start_api`

#### The frontend

The frontend is stored under `./app`

`cd ./app`

And start with `make start_app`

#### Todo

- Move smart contract logic to the backend
- Add persistence to backend so articles can be saved
- Simplify smart contract logic and remove expensive data storage
- Fix issues with frontend rendering and add test cases
