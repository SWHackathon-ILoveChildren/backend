import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { getToday } from 'src/commons/utils/utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async uploadImages({ file }: { file: Express.Multer.File }): Promise<string> {
    const bucketName = process.env.BUCKET;
    const storage = new Storage({
      keyFilename: process.env.KEYFILENAME,
      projectId: process.env.PROJECTID,
    });

    const bucket = storage.bucket(bucketName);
    const destination = `${getToday()}/${uuidv4()}/${file.originalname}`;

    await bucket.upload(file.path, {
      gzip: true,
      destination,
      metadata: {
        contentType: file.mimetype,
      },
    });

    return `https://storage.googleapis.com/${bucketName}/${destination}`;
  }
}
