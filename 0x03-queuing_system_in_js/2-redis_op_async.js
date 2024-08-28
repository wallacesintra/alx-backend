#!/usr/bin/yarn dev

import { error } from 'console';
import { response } from 'express';
import { createClient, print } from 'redis';
import { promisify } from 'util'

const client = createClient();

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, print);
}

const displaySchoolValue = async (schoolName) => {
    client.get(schoolName, (error, response) => {
        console.log(response);
    })
}

async function main() {
    await displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
}


client.on('error', (error) => {
    console.log(`Redis client not connected to the server: `, error.toString());
})

client.on('connect', async () => {
    console.log(`Redis client connected to the server`);
    await main()
})
