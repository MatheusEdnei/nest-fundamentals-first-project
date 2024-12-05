import { Test } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhotoMock } from '../testing/get-photo.mock';

describe('FileService', () => {
    let fileService: FileService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [FileService],
        }).compile();
        fileService = module.get(FileService);
    });

    test('should be defined', () => {
        expect(fileService).toBeDefined();
    });

    describe('Teste do FileService', () => {
        test('upload method', async () => {
            const photo = await getPhotoMock();
            const filename = 'photo-test.png';
            fileService.upload(photo, filename);
        });
    });
});
