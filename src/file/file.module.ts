import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema,User} from '../auth/schemas/users.schema'

@Module({
  imports:[ MongooseModule.forFeature([
    { name: User.name, schema: UserSchema},
  ])
  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
