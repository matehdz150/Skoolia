import { Controller, Post, Body, Get, Param, Patch, BadRequestException } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() dto: CreateLeadDto) {
    try {
      return await this.leadsService.create(dto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('school/:schoolId')
  async findAllBySchool(@Param('schoolId') schoolId: string) {
    return this.leadsService.findAllBySchool(schoolId);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'contacted' | 'enrolled' | 'pending' | 'rejected',
  ) {
    if (!['contacted', 'enrolled', 'pending', 'rejected'].includes(status)) {
      throw new BadRequestException('Invalid status');
    }
    return this.leadsService.updateStatus(id, status);
  }
}
