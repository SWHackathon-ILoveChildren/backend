import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async uploadImages({ file }) {
    const bucketName = process.env.BUCKET;
    const storage = new Storage({
      keyFilename: process.env.KEYFILENAME,
      projectId: process.env.PROJECTID,
    });

    const bucket = storage.bucket(bucketName);
    const destination = file.filename;
    const path = `${getToday()}/${uuidv4()}/origin/${uuidv4()}`;

    console.log(storage);

    await bucket.upload(file.path, {
      gzip: true,
      destination,
    });

    return `/${bucketName}/${destination}`;
  }
}
