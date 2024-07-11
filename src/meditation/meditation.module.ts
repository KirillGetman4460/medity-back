import { Module } from '@nestjs/common';
import { MeditationService } from './meditation.service';
import { MeditationController } from './meditation.controller';

@Module({
  providers: [MeditationService],
  controllers: [MeditationController]
})
export class MeditationModule {}
