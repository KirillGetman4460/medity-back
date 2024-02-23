import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Body,
    Query,
    Param
  } from '@nestjs/common';
  import { User } from '../auth/schemas/users.schema';
    import { Model } from 'mongoose';
  import { InjectModel } from '@nestjs/mongoose';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname,join } from 'path';
  import { createWriteStream, readFile, readFileSync,existsSync,unlinkSync } from 'fs';
  import { ApiBody, ApiConsumes, ApiQuery,ApiTags } from '@nestjs/swagger';
  import sizeOf from 'image-size';
  
  @ApiTags('file upload')
  @Controller('file')
  export class FileController {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    )
    async uploadFile(@UploadedFile() file,@Query('userId') userId: string) {  
      
      try {
    
        if (file && file.filename) {
          const data = readFileSync(file.path);
          const dimensions = sizeOf(data);
    
          const currentUser = await this.userModel.findOne({userId: userId})
    
          if(!currentUser){
            return {
                code: 404,
                message: 'user not found',
            };
          }
    
          if (dimensions.width && dimensions.height) {
            const writeStream = createWriteStream(`./uploads/${file.filename}`);
            writeStream.write(data);
            writeStream.end();
            
            await this.userModel.findOneAndUpdate(
                {userId:userId},
                {img:`http://localhost:3000/uploads/${file.filename}`}
            )
    
            return {
              code: 201,
              path: `http://localhost:3000/uploads/${file.filename}`,
            };
          } else {
            
            return {
              code: 500,
              message: 'is not image',
            };
          }
        } else {
          return {
            code: 500,
            message: 'error image',
          };
        }
      } catch (err) {
        console.log(err);
        return {
          code: 500,
          message: err,
        };
      }
    }
  }