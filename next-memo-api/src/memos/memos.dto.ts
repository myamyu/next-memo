import {IsNotEmpty, MaxLength} from 'class-validator';

export class MemoPropertyDto {
  @IsNotEmpty()
  @MaxLength(80)
  title: string;

  @IsNotEmpty()
  description: string;
}
