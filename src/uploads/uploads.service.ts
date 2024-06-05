import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { CreateUploadDto } from './dto/create-upload.dto';

@Injectable()
export class UploadsService {
  async upload(file: Express.Multer.File) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // const ext = extname(file.originalname);
    const filename = `${uniqueSuffix}-_-${file.originalname}`;

    const supaBaseURL = 'https://fcxatoalzgefilxbdrlp.supabase.co';
    const supaBaseKEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjeGF0b2FsemdlZmlseGJkcmxwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzM4MTExMiwiZXhwIjoyMDMyOTU3MTEyfQ.sUZa4WlzqcD982tPCaqTWpAcyxaxMi834i5Y0A-xCUY';
    const supaBase = createClient(supaBaseURL, supaBaseKEY, {
      auth: {
        persistSession: false,
      },
    });
    const { data } = await supaBase.storage
      .from('eficacia')
      .upload(filename, file.buffer, {
        upsert: false,
      });

    return data;
  }

  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload' + createUploadDto;
  }
}
