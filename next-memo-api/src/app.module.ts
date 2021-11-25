import { Module } from '@nestjs/common';
import { MemosModule } from './memos/memos.module';

@Module({
  imports: [MemosModule],
})
export class AppModule {}
