import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { PathLike } from 'fs';

@Injectable()
export class FileService {

    getDestinationPath(): string {
        return join(__dirname, '..', '..', 'storage', 'photos');
    }
    async upload(file: Express.Multer.File, filename: string) {
        const path: PathLike = join(this.getDestinationPath(), filename);
        return writeFile(path, file.buffer);
    }
}
