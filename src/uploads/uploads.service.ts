import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadsService {
  async upload(file: Express.Multer.File) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // const ext = extname(file.originalname);
    const filename = `${uniqueSuffix}-_-${file.originalname}`;

    const r = /\.([^./]+)$/.exec(file.originalname);
    const extensao = (r && r[1]) || '';

    const supaBaseURL = 'https://fcxatoalzgefilxbdrlp.supabase.co';
    const supaBaseKEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjeGF0b2FsemdlZmlseGJkcmxwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzM4MTExMiwiZXhwIjoyMDMyOTU3MTEyfQ.sUZa4WlzqcD982tPCaqTWpAcyxaxMi834i5Y0A-xCUY';
    const supaBase = createClient(supaBaseURL, supaBaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    let contentTypeFile: string = '';
    if (extensao === 'pdf') {
      contentTypeFile = 'application/pdf';
    } else if (extensao === 'jpg') {
      contentTypeFile = 'image/jpeg';
    } else if (extensao === 'png') {
      contentTypeFile = 'image/png';
    } else {
      contentTypeFile = 'text/plain';
    }

    const { data, error } = await supaBase.storage
      .from('eficacia')
      .upload(filename, file.buffer, {
        upsert: false,
        contentType: contentTypeFile,
      });

    if (error) console.log(error);

    return data;
  }

  async getUpload(fullPath: string) {
    const supaBaseURL = 'https://fcxatoalzgefilxbdrlp.supabase.co';
    const supaBaseKEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjeGF0b2FsemdlZmlseGJkcmxwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzM4MTExMiwiZXhwIjoyMDMyOTU3MTEyfQ.sUZa4WlzqcD982tPCaqTWpAcyxaxMi834i5Y0A-xCUY';
    const supaBase = createClient(supaBaseURL, supaBaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    // const { data, error } = await supaBase.storage
    //   .from('eficacia2')
    //   .download(fullPath)
    const { data, error } = await supaBase.storage
      .from('eficacia')
      .createSignedUrl(fullPath, 3600);

    if (error) console.log(error);

    return data.signedUrl;
  }
}
