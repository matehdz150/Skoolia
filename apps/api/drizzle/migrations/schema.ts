import { pgTable, index, uniqueIndex, uuid, text, timestamp, unique, foreignKey, integer, doublePrecision, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const courseStatus = pgEnum("course_status", ['draft', 'published', 'archived'])


export const refreshTokens = pgTable("refresh_tokens", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	role: text().notNull(),
	tokenHash: text("token_hash").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
}, (table) => [
	index("refresh_tokens_user_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("refresh_tokens_user_role_unique").using("btree", table.userId.asc().nullsLast().op("text_ops"), table.role.asc().nullsLast().op("text_ops")),
]);

export const publicUsers = pgTable("public_users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text(),
	avatarUrl: text(),
	email: text().notNull(),
	passwordHash: text("password_hash").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("public_users_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	unique("public_users_email_unique").on(table.email),
]);

export const schoolRatings = pgTable("school_ratings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	schoolId: uuid("school_id").notNull(),
	publicUserId: uuid("public_user_id").notNull(),
	rating: integer().notNull(),
	comment: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("school_rating_unique").using("btree", table.schoolId.asc().nullsLast().op("uuid_ops"), table.publicUserId.asc().nullsLast().op("uuid_ops")),
	index("school_ratings_school_idx").using("btree", table.schoolId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.schoolId],
			foreignColumns: [schools.id],
			name: "school_ratings_school_id_schools_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.publicUserId],
			foreignColumns: [publicUsers.id],
			name: "school_ratings_public_user_id_public_users_id_fk"
		}).onDelete("cascade"),
]);

export const courses = pgTable("courses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	schoolId: uuid("school_id").notNull(),
	name: text().notNull(),
	description: text(),
	coverImageUrl: text("cover_image_url"),
	price: integer().default(0).notNull(),
	capacity: integer(),
	startDate: timestamp("start_date", { mode: 'string' }),
	endDate: timestamp("end_date", { mode: 'string' }),
	modality: text(),
	averageRating: doublePrecision("average_rating").default(0).notNull(),
	enrollmentsCount: integer("enrollments_count").default(0).notNull(),
	status: courseStatus().default('draft').notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("courses_active_idx").using("btree", table.isActive.asc().nullsLast().op("bool_ops")),
	index("courses_rating_idx").using("btree", table.averageRating.asc().nullsLast().op("float8_ops")),
	index("courses_school_idx").using("btree", table.schoolId.asc().nullsLast().op("uuid_ops")),
	index("courses_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.schoolId],
			foreignColumns: [schools.id],
			name: "courses_school_id_schools_id_fk"
		}).onDelete("cascade"),
]);

export const schoolFavorites = pgTable("school_favorites", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	publicUserId: uuid("public_user_id").notNull(),
	schoolId: uuid("school_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("school_favorites_school_idx").using("btree", table.schoolId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("school_favorites_unique").using("btree", table.publicUserId.asc().nullsLast().op("uuid_ops"), table.schoolId.asc().nullsLast().op("uuid_ops")),
	index("school_favorites_user_idx").using("btree", table.publicUserId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.publicUserId],
			foreignColumns: [publicUsers.id],
			name: "school_favorites_public_user_id_public_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.schoolId],
			foreignColumns: [schools.id],
			name: "school_favorites_school_id_schools_id_fk"
		}).onDelete("cascade"),
]);

export const schoolCategories = pgTable("school_categories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	schoolId: uuid("school_id").notNull(),
	categoryId: uuid("category_id").notNull(),
}, (table) => [
	index("school_categories_category_idx").using("btree", table.categoryId.asc().nullsLast().op("uuid_ops")),
	index("school_categories_school_idx").using("btree", table.schoolId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("school_categories_unique").using("btree", table.schoolId.asc().nullsLast().op("uuid_ops"), table.categoryId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.schoolId],
			foreignColumns: [schools.id],
			name: "school_categories_school_id_schools_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "school_categories_category_id_categories_id_fk"
		}).onDelete("cascade"),
]);

export const students = pgTable("students", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	publicUserId: uuid("public_user_id").notNull(),
	name: text().notNull(),
	age: integer().notNull(),
	monthlyBudget: doublePrecision("monthly_budget"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("students_public_user_unique").using("btree", table.publicUserId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.publicUserId],
			foreignColumns: [publicUsers.id],
			name: "students_public_user_id_public_users_id_fk"
		}).onDelete("cascade"),
]);

export const studentInterests = pgTable("student_interests", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	studentId: uuid("student_id").notNull(),
	categoryId: uuid("category_id").notNull(),
}, (table) => [
	index("student_interests_category_idx").using("btree", table.categoryId.asc().nullsLast().op("uuid_ops")),
	index("student_interests_student_idx").using("btree", table.studentId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("student_interests_unique").using("btree", table.studentId.asc().nullsLast().op("uuid_ops"), table.categoryId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "student_interests_student_id_students_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "student_interests_category_id_categories_id_fk"
		}).onDelete("cascade"),
]);

export const schools = pgTable("schools", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	logoUrl: text("logo_url"),
	coverImageUrl: text("cover_image_url"),
	address: text(),
	city: text(),
	latitude: doublePrecision(),
	longitude: doublePrecision(),
	educationalLevel: text("educational_level"),
	institutionType: text("institution_type"),
	schedule: text(),
	maxStudentsPerClass: integer("max_students_per_class"),
	languages: text(),
	enrollmentYear: integer("enrollment_year"),
	enrollmentOpen: boolean("enrollment_open").default(false),
	monthlyPrice: integer("monthly_price"),
	averageRating: doublePrecision("average_rating").default(0).notNull(),
	ratingsCount: integer("ratings_count").default(0).notNull(),
	favoritesCount: integer("favorites_count").default(0).notNull(),
	rankingScore: doublePrecision("ranking_score").default(0).notNull(),
	isFeatured: boolean("is_featured").default(false).notNull(),
	isVerified: boolean("is_verified").default(false).notNull(),
	ownerId: uuid("owner_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("schools_city_idx").using("btree", table.city.asc().nullsLast().op("text_ops")),
	index("schools_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	index("schools_owner_idx").using("btree", table.ownerId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("schools_owner_unique").using("btree", table.ownerId.asc().nullsLast().op("uuid_ops")),
	index("schools_rating_idx").using("btree", table.averageRating.asc().nullsLast().op("float8_ops")),
	index("schools_verified_idx").using("btree", table.isVerified.asc().nullsLast().op("bool_ops")),
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [privateUsers.id],
			name: "schools_owner_id_private_users_id_fk"
		}).onDelete("cascade"),
]);

export const categories = pgTable("categories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	slug: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("categories_slug_unique").using("btree", table.slug.asc().nullsLast().op("text_ops")),
]);

export const privateUsers = pgTable("private_users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	passwordHash: text("password_hash").notNull(),
	isActive: text("is_active").default('true').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	name: text(),
}, (table) => [
	index("private_users_active_idx").using("btree", table.isActive.asc().nullsLast().op("text_ops")),
	index("private_users_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	unique("private_users_email_unique").on(table.email),
]);
