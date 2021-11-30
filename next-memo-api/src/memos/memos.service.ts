import { Injectable } from '@nestjs/common';
import { MemoPropertyDto } from './memos.dto';
import { Memo } from './memos.entity';

@Injectable()
export class MemosService {
  private lastId = 0;
  private memos: Memo[] = [];

  async getMemos(): Promise<Memo[]> {
    return Promise.resolve(this.memos);
  }

  async createMemo(dto: MemoPropertyDto): Promise<Memo> {
    const memo = new Memo();
    memo.id = this.lastId++;
    memo.title = dto.title;
    memo.description = dto.description;
    this.memos.push(memo);
    return Promise.resolve(memo);
  }

  async updateMemo(id: number, dto: MemoPropertyDto): Promise<void> {
    const memo = this.memos.find((m) => m.id === id);
    if (!memo) return Promise.reject(new Error(`id [${id}] が見つからない`));

    memo.title = dto.title;
    memo.description = dto.description;
    return Promise.resolve();
  }

  async deleteMemo(id: number): Promise<void> {
    const memo = this.memos.find((m) => m.id === id);
    if (!memo) return Promise.reject(new Error(`id [${id}] が見つからない`));

    this.memos = this.memos.filter((m) => m.id !== id);
    return Promise.resolve();
  }
}
