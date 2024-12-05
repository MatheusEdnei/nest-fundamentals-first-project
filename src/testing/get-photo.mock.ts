import { fileToBuffer } from './file-to-buffer';
import { join } from 'path';

export const getPhotoMock = async () => {
    const { buffer, stream } = await fileToBuffer(join(__dirname, 'photo.png'));
    const photo: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'photo.png',
        encoding: 'base64',
        mimetype: 'image/png',
        size: 128,
        stream,
        destination: '',
        filename: 'photo.png',
        path: 'path',
        buffer,
    };

    return photo;
};
