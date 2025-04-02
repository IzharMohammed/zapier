import { Kafka } from "kafkajs"
import { db } from "./db"
import { zapRuns, zapRunsOutbox } from "./db/schema"
import { eq, inArray, sql } from "drizzle-orm"

const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId: 'processor',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

async function main() {
    await producer.connect()
    while (1) {

        const pendingZapRuns = await db.select().from(zapRunsOutbox).limit(10);

        if (pendingZapRuns.length === 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        }

        await producer.send({
            topic: TOPIC_NAME,
            messages: pendingZapRuns.map(zaps => ({
                value: JSON.stringify({
                    zapRunId: zaps.zapRunId
                })
            }))
        })

        await db.delete(zapRunsOutbox).where(
            inArray(
                zapRunsOutbox.zapRunId,
                pendingZapRuns.map(x => x.zapRunId)
            )
        )
    }
}

main().catch(console.error)