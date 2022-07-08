import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [file, file]

    const storage = new Storage({
      projectId: 'rare-gist-352601',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('moyeo-data');

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`moyeo-data/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );
    return results;
  }
}
