import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const date = Date.now();
        return next.handle().pipe(
            tap(() => {
                console.log(`URL: ${context.switchToHttp().getRequest().url}`);
                console.log(`Execução levou: ${Date.now() - date} milisegundos.`);
            }),
        );
    }
}
