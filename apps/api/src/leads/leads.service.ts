import { Injectable, NotFoundException } from '@nestjs/common';
import { drizzle } from 'src/db';
import { leads, publicUsers, courses } from 'drizzle/schemas';
import { eq } from 'drizzle-orm';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  async create(dto: CreateLeadDto) {
    const [lead] = await drizzle
      .insert(leads)
      .values({
        ...dto,
        status: 'pending',
        createdAt: new Date(),
      })
      .returning();
    return lead;
  }

  async findAllBySchool(schoolId: string) {
    // Join con parent y course (si existe)
    return drizzle
      .select({
        lead: leads,
        parent: publicUsers,
        course: courses,
      })
      .from(leads)
      .leftJoin(publicUsers, eq(leads.parentId, publicUsers.id))
      .leftJoin(courses, eq(leads.courseId, courses.id))
      .where(eq(leads.schoolId, schoolId));
  }

  async updateStatus(id: string, status: 'contacted' | 'enrolled' | 'pending' | 'rejected') {
    const [lead] = await drizzle
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }
}
