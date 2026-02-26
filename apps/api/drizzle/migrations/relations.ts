import { relations } from "drizzle-orm/relations";
import { schools, schoolRatings, publicUsers, courses, schoolFavorites, schoolCategories, categories, students, studentInterests, privateUsers } from "./schema";

export const schoolRatingsRelations = relations(schoolRatings, ({one}) => ({
	school: one(schools, {
		fields: [schoolRatings.schoolId],
		references: [schools.id]
	}),
	publicUser: one(publicUsers, {
		fields: [schoolRatings.publicUserId],
		references: [publicUsers.id]
	}),
}));

export const schoolsRelations = relations(schools, ({one, many}) => ({
	schoolRatings: many(schoolRatings),
	courses: many(courses),
	schoolFavorites: many(schoolFavorites),
	schoolCategories: many(schoolCategories),
	privateUser: one(privateUsers, {
		fields: [schools.ownerId],
		references: [privateUsers.id]
	}),
}));

export const publicUsersRelations = relations(publicUsers, ({many}) => ({
	schoolRatings: many(schoolRatings),
	schoolFavorites: many(schoolFavorites),
	students: many(students),
}));

export const coursesRelations = relations(courses, ({one}) => ({
	school: one(schools, {
		fields: [courses.schoolId],
		references: [schools.id]
	}),
}));

export const schoolFavoritesRelations = relations(schoolFavorites, ({one}) => ({
	publicUser: one(publicUsers, {
		fields: [schoolFavorites.publicUserId],
		references: [publicUsers.id]
	}),
	school: one(schools, {
		fields: [schoolFavorites.schoolId],
		references: [schools.id]
	}),
}));

export const schoolCategoriesRelations = relations(schoolCategories, ({one}) => ({
	school: one(schools, {
		fields: [schoolCategories.schoolId],
		references: [schools.id]
	}),
	category: one(categories, {
		fields: [schoolCategories.categoryId],
		references: [categories.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	schoolCategories: many(schoolCategories),
	studentInterests: many(studentInterests),
}));

export const studentsRelations = relations(students, ({one, many}) => ({
	publicUser: one(publicUsers, {
		fields: [students.publicUserId],
		references: [publicUsers.id]
	}),
	studentInterests: many(studentInterests),
}));

export const studentInterestsRelations = relations(studentInterests, ({one}) => ({
	student: one(students, {
		fields: [studentInterests.studentId],
		references: [students.id]
	}),
	category: one(categories, {
		fields: [studentInterests.categoryId],
		references: [categories.id]
	}),
}));

export const privateUsersRelations = relations(privateUsers, ({many}) => ({
	schools: many(schools),
}));