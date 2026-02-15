import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  doublePrecision,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { privateUsers } from '../users/private-users';

export const schools = pgTable(
  'schools',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    name: text('name').notNull(),

    description: text('description'),

    // 🖼 imágenes
    logoUrl: text('logo_url'),
    coverImageUrl: text('cover_image_url'),

    // 📍 ubicación
    address: text('address'),
    city: text('city'),
    latitude: doublePrecision('latitude'),
    longitude: doublePrecision('longitude'),

    // ⭐ métricas
    averageRating: doublePrecision('average_rating').default(0).notNull(),

    favoritesCount: integer('favorites_count').default(0).notNull(),

    // ✅ verificación
    isVerified: boolean('is_verified').default(false).notNull(),

    // 🔐 owner
    ownerId: uuid('owner_id')
      .notNull()
      .references(() => privateUsers.id, {
        onDelete: 'cascade',
      }),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    ownerUnique: uniqueIndex('schools_owner_unique').on(table.ownerId),
    ownerIdx: index('schools_owner_idx').on(table.ownerId),
    nameIdx: index('schools_name_idx').on(table.name),
    cityIdx: index('schools_city_idx').on(table.city),
    ratingIdx: index('schools_rating_idx').on(table.averageRating),
    verifiedIdx: index('schools_verified_idx').on(table.isVerified),
  }),
);
