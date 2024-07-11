import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';


@Module({
  imports:[ MongooseModule.forFeature([
  ])
],
  providers: [SchedulerService],
  controllers: [SchedulerController]
})
export class SchedulerModule {}
