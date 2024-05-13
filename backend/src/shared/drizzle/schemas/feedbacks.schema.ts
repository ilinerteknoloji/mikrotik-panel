import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { usersSchema } from ".";

export const feedbacksSchema = mysqlTable("feedbacks", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => usersSchema.id),
  message: text("message").notNull(),
  status: boolean("status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const feedbacksRelations = relations(feedbacksSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [feedbacksSchema.userId],
    references: [usersSchema.id],
  }),
}));

export type FeedbacksSchemaType = InferSelectModel<typeof feedbacksSchema>;
export type FeedbacksSchemaInsertType = InferInsertModel<
  typeof feedbacksSchema
>;
