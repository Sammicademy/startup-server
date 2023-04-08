import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
  async saveFile(file: Express.Multer.File, folder: string = 'default'): Promise<FileResponse> {
    const uploadFolder = `${path}/uploads/${folder}`;
    await ensureDir(uploadFolder);
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

    const response: FileResponse = {
      url: `/uploads/${folder}/${file.originalname}`,
      name: file.originalname,
    };

    return response;
  }
}
