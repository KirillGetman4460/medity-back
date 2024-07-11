import { Module } from '@nestjs/common';
import {UserSchema,User} from '../auth/schemas/users.schema'
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
  ])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
