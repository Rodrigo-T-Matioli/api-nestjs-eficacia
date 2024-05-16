import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';

@Injectable()
export class UploadsService {
  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload' + createUploadDto;
  }
}
