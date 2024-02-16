import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSchema } from 'src/auth/schemas/users.schema';
import { ForgotService } from './forgot.service';
import { ForgotController } from './forgot.controller';
import {Forgot,ForgotSchema} from './schemas/forgot.schema'

@Module({
  providers: [ForgotService],
  imports: [
    // TypeOrmModule.forFeature([users]),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'user' },
      {
        name: Forgot.name,
        schema: ForgotSchema,
        collection: 'forgot',
      },
    ]),
  ],
  controllers: [ForgotController]
})
export class ForgotModule {}
