import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { MemoPropertyDto } from './memos.dto';
import { MemosService } from './memos.service';
import { Memo } from './memos.entity';

@Controller('memos')
export class MemosController {
  constructor(
    private memosService: MemosService,
  ) {}

  @Get()
  getMemos():Promise<Memo[]> {
    return this.memosService.getMemos();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createMemo(
    @Body() memo: MemoPropertyDto,
  ): Promise<Memo> {
    return this.memosService.createMemo(memo);
  }

  @Delete('/:id')
  deleteMemo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.memosService.deleteMemo(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  editMemo(
    @Param('id', ParseIntPipe) id: number,
    @Body() memo: MemoPropertyDto,
  ): Promise<void> {
    return this.memosService.updateMemo(id, memo);
  }
}
