import { createReadStream, ReadStream } from 'fs';
import { Buffer } from 'buffer';

export const fileToBuffer = (fileName: string) => {
    const readStream = createReadStream(fileName);
    const chunks = [];
    return new Promise<{ buffer: Buffer; stream: ReadStream }>(
        (resolve, reject) => {
            readStream.on('data', (chunk) => chunks.push(chunk));
            readStream.on('error', (err) => {
                reject(err);
            });

            readStream.on('close', () =>
                resolve({
                    buffer: Buffer.concat(chunks) as Buffer,
                    stream: readStream,
                }),
            );
        },
    );
};
