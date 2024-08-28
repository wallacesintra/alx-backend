#!/usr/bin/yarn dev

/**
 * Create a queue with Kue
 * Create an object containing the Job data with the following format:
        {
            phoneNumber: string,
            message: string,
        }
 * Create a queue named push_notification_code, and create a job with the object created before
 * When the job is created without error, log to the console Notification job created: JOB ID
 * When the job is completed, log to the console Notification job completed
 * When the job is failing, log to the console Notification job failed.
*/

import { createQueue } from "kue";

const queue = createQueue({name: 'push_notification_code'})

const job = queue.create('push_notification_code', {
    phoneNumber: "07782344007",
    message: "It is a new thing"
})

job
    .on('enqueue', () => console.log(`Notification job created: ${job.id}`))
    .on('complete', () => console.log(`Notification job completed`))
    .on('failed attempt', () => console.log(`Notification job failed`))

job.save()
