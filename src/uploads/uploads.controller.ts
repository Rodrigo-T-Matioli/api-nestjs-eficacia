import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { extname } from 'path';
import { UploadsService } from './uploads.service';

import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Get(':patch')
  getFile(@Param('patch') patch: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), `./uploads/${patch}`));
    return new StreamableFile(file);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          // const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}-_-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  upLoadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file;
  }
}
