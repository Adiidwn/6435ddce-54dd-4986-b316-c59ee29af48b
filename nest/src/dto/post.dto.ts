import { IsNotEmpty } from 'class-validator';

export class PostDto {
  id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
}
