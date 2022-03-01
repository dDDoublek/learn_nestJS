import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.model';
import { CreateBoardDTO } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getUserBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async getBoardByUserId(user: User): Promise<Board[]> {
    const boards = await this.boardRepository.find({ user });
    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne(id);

    if (!board) {
      throw new NotFoundException(`${id}인 board는 찾을 수 없습니다.`);
    }

    return board;
  }

  createBoard(createBoardDto: CreateBoardDTO, user: User): Promise<Board> {
    // repository에서 처리할 수 요청 코드를 만든다.
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const board = await this.boardRepository.delete({ id, user });

    if (board.affected === 0) {
      throw new NotFoundException(
        `삭제하려고 하는 ${id}의 Board를 찾을 수 없습니다.`,
      );
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
