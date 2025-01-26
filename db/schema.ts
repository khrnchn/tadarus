import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  varchar,
  serial,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique().notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: varchar("session_token", { length: 255 }).primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compositePk: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: varchar("credential_id", { length: 255 }).notNull().unique(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: varchar("credential_device_type", { length: 32 }).notNull(),
    credentialBackedUp: boolean("credential_backed_up").notNull(),
    transports: varchar("transports", { length: 255 }),
  },
  (auth) => ({
    compositePK: primaryKey({ columns: [auth.userId, auth.credentialID] }),
  })
);

export const teams = pgTable("team", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  leaderId: integer("leader_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const teamMemberships = pgTable(
  "team_membership",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    isLeader: boolean("is_leader").notNull().default(false),
    joinedAt: timestamp("joined_at", { mode: "date" }).defaultNow().notNull(),
  },
  (tm) => ({
    compositePK: primaryKey({ columns: [tm.userId, tm.teamId] }),
  })
);

export const invitations = pgTable("invitation", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 32 })
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }),
});

export const usersRelations = relations(users, ({ many }) => ({
  teams: many(teams, { relationName: "leader" }),
  memberships: many(teamMemberships, { relationName: "user" }),
  invitations: many(invitations, { relationName: "user" }),
}));

export const teamsRelations = relations(teams, ({ many, one }) => ({
  leader: one(users, {
    fields: [teams.leaderId],
    references: [users.id],
  }),
  memberships: many(teamMemberships, { relationName: "team" }),
  invitations: many(invitations, { relationName: "team" }),
}));

export const teamMembershipsRelations = relations(teamMemberships, ({ one }) => ({
  user: one(users, {
    fields: [teamMemberships.userId],
    references: [users.id],
    relationName: "memberships",
  }),
  team: one(teams, {
    fields: [teamMemberships.teamId],
    references: [teams.id],
    relationName: "memberships",
  }),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  user: one(users, {
    fields: [invitations.userId],
    references: [users.id],
    relationName: "invitations",
  }),
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
    relationName: "invitations",
  }),
}));

export type User = InferSelectModel<typeof users>;
export type Team = InferSelectModel<typeof teams>;
export type TeamMembership = InferSelectModel<typeof teamMemberships>;
export type Invitation = InferSelectModel<typeof invitations>;
export type Authenticator = InferSelectModel<typeof authenticators>;