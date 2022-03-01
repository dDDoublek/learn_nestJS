import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardController');
  constructor(private boardsService: BoardsService) {}

  @Get('/all')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/all/users')
  getUserBoards(
    @GetUser()
    user: User,
  ): Promise<Board[]> {
    this.logger.verbose(
      `로그 : ${user.username}님이 작성한 보드를 조회합니다.`,
    );
    return this.boardsService.getUserBoards(user);
  }

  @Get('/all/user')
  getBoardByUserId(
    @GetUser()
    user: User,
  ): Promise<Board[]> {
    this.logger.verbose(
      `로그 : ${user.username}님이 작성한 보드를 조회합니다.`,
    );
    return this.boardsService.getBoardByUserId(user);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDTO,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `로그 : ${user.username}님이 ${JSON.stringify(
        createBoardDto.title,
      )} 의 제목으로 보드를 작성합니다.`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
