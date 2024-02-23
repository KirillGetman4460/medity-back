import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './schemas/notification.schema';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create notification' })
  @ApiResponse({ status: 201, description: 'The notification has been successfully created.'})
  async create(@Body() data:CreateNotificationDto) {
    return this.notificationsService.create(data);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'Return all notifications.'})
  async findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }
}