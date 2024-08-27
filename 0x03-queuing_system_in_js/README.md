# Queueing System in JS

## Running Redis Server

### Installation

`sudo apt-get install redis-server`

### running

start the server with `redis-server`

you can run on the background using `redis-server --daemonize yes`

checking if the server is running `redis-cli ping`

## running operations with the redis client

access the redis CLI: `redis cli` in the terminal

Basic commands:

* set a key-value pair `SET key value`
* get a value by key `GET key`
* delete a key `DEL key`
* increment a key's value `INCR key`
* list all keys `KEYS *`

## using redis client with node.js

### set up

install redis package: `npm install redis`

```js
const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
  console.log('Connected to Redis...');
});

client.set('key', 'value', redis.print);
client.get('key', (err, reply) => {
  if (err) throw err;
  console.log(reply);
});

client.quit();

```

## Storing Hash Values in redis

set fields in a hash : `HSET hash_name field value`

get all fields and values in a hash: `HGETALL hash_name`

```js
client.hset('user:1000', 'name', 'Wallace', 'age', '25', redis.print);
client.hgetall('user:1000', (err, obj) => {
  if (err) throw err;
  console.log(obj);
});

```

## Handling Async Operations with redis

using promise

```js
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

(async () => {
  const value = await getAsync('key');
  console.log(value);
})();
```

you can also `async` / `await` to handle asynchronous operations.

## Using Kue as a queue system

install `npm install kue`

```js
const kue = require('kue');
const queue = kue.createQueue();

queue.process('email', (job, done) => {
  console.log('Processing job:', job.data);
  done();
});

const job = queue.create('email', {
  title: 'Send email to user',
  to: 'example@example.com',
  body: 'Hello!'
}).save((err) => {
  if (!err) console.log(`Job saved with ID ${job.id}`);
});

```

## Building a basic express app interacting with a redis server

install Express and Redis `npm install express redis`

```js
const express = require('express');
const redis = require('redis');
const app = express();
const client = redis.createClient();

app.get('/', (req, res) => {
  client.get('key', (err, reply) => {
    if (err) res.status(500).send(err);
    else res.send(`Value: ${reply}`);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

```

## Building a basic Express app interacting with a redis server and queue

Install Express, Redis, and Kue: `npm install express redis kue`

```js
const express = require('express');
const redis = require('redis');
const kue = require('kue');
const app = express();
const client = redis.createClient();
const queue = kue.createQueue();

app.get('/job', (req, res) => {
  const job = queue.create('job', {
    title: 'Job to do',
    details: 'Some details'
  }).save((err) => {
    if (!err) res.send(`Job created with ID ${job.id}`);
    else res.status(500).send(err);
  });
});

queue.process('job', (job, done) => {
  client.set('job:status', 'done', redis.print);
  done();
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

```
