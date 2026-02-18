import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { privateUsers } from '../../drizzle/schemas/users/private-users';
import { publicUsers } from '../../drizzle/schemas/users/public-users';
import { schools } from '../../drizzle/schemas/schools/school';
import { categories } from 'drizzle/schemas';
import { schoolCategories } from '../../drizzle/schemas/schools/school-categories.pivot';
import { courses } from '../../drizzle/schemas/courses/courses';
import { schoolRatings } from '../../drizzle/schemas/schools/school-ratings';
import { schoolFavorites } from '../../drizzle/schemas/schools/school-favorites';

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  console.log('🌱 Seeding database...');

  // ==============================
  // 1️⃣ CATEGORIES
  // ==============================

  const categoryList = [
    { name: 'Arte', slug: 'arte' },
    { name: 'Deportes', slug: 'deportes' },
    { name: 'Tecnologia', slug: 'tecnologia' },
    { name: 'Idiomas', slug: 'idiomas' },
    { name: 'Musica', slug: 'musica' },
  ];

  const hashedPassword = await bcrypt.hash('123456', 10);

  const insertedCategories = await db
    .insert(categories)
    .values(categoryList)
    .returning();

  console.log('✅ Categories created');

  // ==============================
  // 2️⃣ PRIVATE USERS
  // ==============================

  const owners = Array.from({ length: 15 }).map((_, i) => ({
    id: randomUUID(),
    email: `owner${i + 1}@test.com`,
    passwordHash: hashedPassword,
    role: 'private' as const,
  }));

  await db.insert(privateUsers).values(owners);
  console.log('✅ 15 private users created');

  // ==============================
  // 3️⃣ PUBLIC USERS
  // ==============================

  const publics = Array.from({ length: 10 }).map((_, i) => ({
    id: randomUUID(),
    email: `public${i + 1}@test.com`,
    passwordHash: hashedPassword,
    role: 'public' as const,
  }));

  await db.insert(publicUsers).values(publics);
  console.log('✅ 10 public users created');

  // ==============================
  // 4️⃣ SCHOOLS
  // ==============================

  const schoolNames = Array.from({ length: 15 }).map(
    (_, i) => `Academia ${i + 1}`,
  );

  const insertedSchools = await db
    .insert(schools)
    .values(
      schoolNames.map((name, i) => ({
        name,
        description: `Descripcion profesional de ${name}`,
        city: i % 2 === 0 ? 'Guadalajara' : 'CDMX',
        ownerId: owners[i].id,
        isVerified: i % 3 === 0,
      })),
    )
    .returning();

  console.log('✅ 15 schools created');

  // ==============================
  // 5️⃣ SCHOOL CATEGORIES
  // ==============================

  await db.insert(schoolCategories).values(
    insertedSchools.map((school, i) => ({
      schoolId: school.id,
      categoryId: insertedCategories[i % insertedCategories.length].id,
    })),
  );

  console.log('✅ Categories assigned');

  // ==============================
  // 6️⃣ COURSES (2 per school)
  // ==============================

  await db.insert(courses).values(
    insertedSchools.flatMap((school, i) => [
      {
        schoolId: school.id,
        name: `Curso Basico ${i + 1}`,
        description: 'Curso introductorio',
        price: 1000 + i * 100,
        capacity: 20,
        modality: 'presencial',
        status: 'published' as const,
      },
      {
        schoolId: school.id,
        name: `Curso Avanzado ${i + 1}`,
        description: 'Curso avanzado profesional',
        price: 2000 + i * 150,
        capacity: 15,
        modality: 'online',
        status: 'published' as const,
      },
    ]),
  );

  console.log('✅ Courses created');

  // ==============================
  // 7️⃣ RATINGS (1 per user per school)
  // ==============================

  const ratingsData = insertedSchools.flatMap((school) =>
    publics.slice(0, 3).map((user) => ({
      schoolId: school.id,
      publicUserId: user.id,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: 'Excelente escuela!',
    })),
  );

  await db.insert(schoolRatings).values(ratingsData);
  console.log('✅ Ratings created');

  // ==============================
  // 8️⃣ FAVORITES
  // ==============================

  await db.insert(schoolFavorites).values(
    insertedSchools.map((school) => ({
      schoolId: school.id,
      publicUserId: publics[Math.floor(Math.random() * publics.length)].id,
    })),
  );

  console.log('✅ Favorites created');

  console.log('🎉 SEED COMPLETED SUCCESSFULLY');

  await pool.end();
}

seed().catch((err) => {
  console.error('❌ Seed failed');
  console.error(err);
  process.exit(1);
});
