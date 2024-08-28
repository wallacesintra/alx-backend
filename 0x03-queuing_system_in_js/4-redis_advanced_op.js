#!/usr/bin/yarn dev

import { createClient, print } from "redis";

const client = createClient();

const updateMap = (mapName, field, fieldValue) => {
    client.hset(mapName, field, fieldValue, print);
}

const displayMap = (mapName) => {
    client.hgetall(mapName, (err, obj) => {
        if (err) throw err
        console.log(obj)
    })
}

const main = () => {
    const hashMap = {
        Portland: 50,
        Seattle:80,
        'New York':20,
        Bogota:20,
        Cali:40,
        Paris:2,
    }

    for (const [field, value] of Object.entries(hashMap)) {
        updateMap('HolbertonSchools', field, value)
    }

    displayMap('HolbertonSchools')
}

client.on('connect', async () => {
    console.log(`Redis client connected to the server`);
    main()
})

client.on('error', (error) => {
    console.log(`Redis client not connected to the server: `, error.toString());
})
