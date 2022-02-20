import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.model';
import { CreateBoardDTO } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne(id);

    if (!board) {
      throw new NotFoundException(`${id}인 board는 찾을 수 없습니다.`);
    }

    return board;
  }

  createBoard(createBoardDto: CreateBoardDTO): Promise<Board> {
    // repository에서 처리할 수 요청 코드를 만든다.
    return this.boardRepository.createBoard(createBoardDto);
  }

  async deleteBoard(id: number): Promise<void> {
    const board = await this.boardRepository.delete(id);

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
