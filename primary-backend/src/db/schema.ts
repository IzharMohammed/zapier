
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";

/* Available Actions Table */
export const availableActions = table("availableActions", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    name: t.varchar("name", { length: 255 }),
    image: t.varchar("image"),
});

export const availableTriggers = table("availableTriggers", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    name: t.varchar("name", { length: 255 }),
    image: t.varchar("image"),
});

/* User Table */
export const user = table("user", {
    id: t.serial("id").primaryKey(), // Prisma uses Int with autoincrement
    name: t.varchar("name", { length: 255 }).notNull(),
    email: t.varchar("email", { length: 255 }).notNull().unique(),
    password: t.varchar("password", { length: 255 }).notNull(), // Should be string
});

export const userRelations = relations(user, ({ many }) => ({
    zap: many(zap),
}))

/* Zap Table */
export const zap = table("zap", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    userId: t.integer("userId").notNull().references(() => user.id),
});

export const zapRelations = relations(zap, ({ one, many }) => ({
    user: one(user, { fields: [zap.userId], references: [user.id] }),
    trigger: one(trigger, { fields: [zap.id], references: [trigger.zapId] }),
    actions: many(action),
    zapRuns: many(zapRuns),
}));

/* Trigger Table */
export const trigger = table("trigger", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    zapId: t.uuid("zapId").unique().references(() => zap.id), // Unique constraint
    triggerId: t.uuid("triggerId").references(() => availableTriggers.id),
    metaData: t.json("metaData"),
});

export const triggerRelations = relations(trigger, ({ one }) => ({
    zap: one(zap, { fields: [trigger.zapId], references: [zap.id] }),
    type: one(availableTriggers, { fields: [trigger.triggerId], references: [availableTriggers.id] }),
}));

/* Action Table */
export const action = table("action", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    zapId: t.uuid("zapId").notNull().references(() => zap.id),
    actionId: t.uuid("actionId").references(() => availableActions.id),
    metaData: t.json("metaData"),
    sortingOrder: t.integer("sortingOrder").default(0),
});

export const actionRelations = relations(action, ({ one }) => ({
    zap: one(zap, { fields: [action.zapId], references: [zap.id] }),
    type: one(availableActions, { fields: [action.actionId], references: [availableActions.id] }),
}));


/* ZapRun Table */
export const zapRuns = table("zapRun", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    zapId: t.uuid("zapId").notNull().references(() => zap.id),
    metaData: t.json("metaData"),
});

export const zapRunRelations = relations(zapRuns, ({ one, many }) => ({
    zap: one(zap, { fields: [zapRuns.zapId], references: [zap.id] }),
    zapRunOutbox: one(zapRunsOutbox),
}));

/* ZapRunOutbox Table */
export const zapRunsOutbox = table("zapRunsOutbox", {
    id: t.uuid("id").primaryKey().defaultRandom(),
    zapRunId: t.uuid("zap_run_id").notNull().unique().references(() => zapRuns.id),
});

export const zapRunOutboxRelations = relations(zapRunsOutbox, ({ one }) => ({
    zapRun: one(zapRuns, { fields: [zapRunsOutbox.zapRunId], references: [zapRuns.id] }),
}));
