import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        // update to prisma 5.0.0, after was this.$on('beforeExit')
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}
