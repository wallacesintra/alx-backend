#!/usr/bin/yarn dev

/**
 * 
    * On connect, it should log the message Redis client connected to the server
    * On error, it should log the message Redis client not connected to the server: ERROR MESSAGE
    * It should subscribe to the channel holberton school channel
    * When it receives message on the channel holberton school channel,
        it should log the message to the console
    * When the message is KILL_SERVER, it should unsubscribe and quit
 */

import { createClient } from 'redis';

const client = createClient();
const EXIT_MSG = 'KILL_SERVER';

client.on('error', (err) => {
    console.log('Redis client not connected to the server:', err.toString());
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.subscribe('holberton school channel');

client.on('message', (_err, msg) => {
    console.log(msg);
    if (msg === EXIT_MSG) {
    client.unsubscribe();
    client.quit();
    }
});
