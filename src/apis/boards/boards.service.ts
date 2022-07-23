import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccompanyService } from '../accompany/accompany.service';
import { AddressService } from '../address/address.service';
import { ImageService } from '../image/image.service';
import { User } from '../user/entities/user.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly imageService: ImageService,
    private readonly accompanyService: AccompanyService,
    private readonly addressService: AddressService,
  ) {}

  async update({ boardId, updateBoardInput }) {
    // prettier-ignore
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['writer', 'eventImage', 'boardAddress', 'comments',
      'coverImage', 'accompanyRequests', 'scheduledUsers']
    });

    const newboard = {
      ...board,
      id: boardId,
      ...updateBoardInput,
    };

    return await this.boardRepository.save(newboard);
  }

  async create({ payload, createBoardInput }) {
    const { eventImageSrc, coverImgSrc, boardAddress, ...input } =
      createBoardInput;

    const userFound = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    const address = await this.addressService.createAddress({ boardAddress });
    const coverImage = await this.imageService.create({ src: coverImgSrc });
    const eventImage = await this.imageService.create({ src: eventImageSrc });

    // prettier-ignore
    const result = await this.boardRepository.save({
      ...input, eventImage, boardAddress: address, writer: userFound, coverImage,
    });

    return result;
  }

  async delete({ boardId }) {
    const result = await this.boardRepository.softDelete({ id: boardId });
    return result.affected ? true : false;
  }

  async findAll({ page, pageSize }) {
    // prettier-ignore
    const boards = await this.boardRepository.find({
      relations: ['writer', 'eventImage', 'boardAddress', 'comments',
      'coverImage', 'accompanyRequests', 'scheduledUsers']
    });
    if (!page || !pageSize) return boards;
    const paginated = [];
    for (let i = (page - 1) * pageSize; i < page * pageSize; i++) {
      if (boards[i]) paginated.push(boards[i]);
    }
    return paginated;
  }

  async findOne({ boardId }) {
    // prettier-ignore
    const result = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['writer', 'eventImage', 'boardAddress', 'comments',
      'coverImage', 'accompanyRequests', 'scheduledUsers']
    });
    const prevCount = result.viewCount;
    // prettier-ignore
    await this.boardRepository.update(
      { id: boardId }, { viewCount: prevCount + 1 }
    )
    return result;
  }

  async request({ boardId, targetUser }) {
    return await this.accompanyService.createRequest({ boardId, targetUser });
  }

  async fetchRequest({ boardId }) {
    const requests = await this.accompanyService.fetchAll();
    const boardReqs = requests.filter((element) => {
      return element.board.id === boardId;
    });
    return boardReqs;
  }

  async markAsFull({ boardId }) {
    return await this.boardRepository.update({ id: boardId }, { isFull: true });
  }
}
