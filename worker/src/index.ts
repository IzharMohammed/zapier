import { Kafka } from "kafkajs"

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
    clientId: 'worker',
    brokers: ['localhost:9092']
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker' });
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value!.toString(),
            })

            await new Promise(r => setTimeout(r, 5000));

            console.log(`Processing done...!!!`);

            await consumer.commitOffsets([{
                offset: (parseInt(message.offset) + 1).toString(),
                partition: 0,
                topic: TOPIC_NAME
            }]);

        },
    })
}


main().catch(console.error)