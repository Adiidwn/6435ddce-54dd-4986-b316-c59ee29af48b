import { Body, Controller, Post } from "@nestjs/common";
import { PostDto } from "src/dto/post.dto";
import { Roles } from "src/guards/roles/roles.decorator";
import { PostService } from "./post.service";

@Controller('posts')
export class AuthController {
  constructor(private readonly postService: PostService) {}


@Post()
@Roles(['admin'])
async create(@Body() postDto: PostDto) {
  this.postService.createPost(postDto);
}
}