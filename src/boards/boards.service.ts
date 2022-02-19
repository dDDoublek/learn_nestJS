import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // getBoardById(id: string): Board {
  //   const board = this.boards.find((board) => board.id === id);
  //   if (!board) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return board;
  // }
  // createBoard(createBoardDto: CreateBoardDTO) {
  //   const board: Board = {
  //     id: uuid(),
  //     title: createBoardDto.title,
  //     description: createBoardDto.description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  // deleteBoard(id: string) {
  //   const board = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
