import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async uploadImages({ file }) {
    const bucketName = process.env.BUCKET;
    const storage = new Storage({
      keyFilename: process.env.KEYFILENAME,
      projectId: process.env.PROJECTID,
    }).bucket(bucketName);

    const upload = await new Promise<string>((resolve, reject) =>
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => resolve(`/${bucketName}/${file.filename}`))
        .on('error', (error) => reject(error))
    );

    console.log(upload);

    return upload;
  }
}
