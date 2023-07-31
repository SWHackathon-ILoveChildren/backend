import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserChildType } from './entities/userChildType.entity';
import { Repository } from 'typeorm';
import { ChildTypeService } from '../childTypes/childType.service';

@Injectable()
export class UserChildTypesService {
  constructor(
    @InjectRepository(UserChildType)
    private userChildTypesRepository: Repository<UserChildType>,

    private childTypeService: ChildTypeService
  ) {}

  async addUserChildType({ childTypeIds, userId }) {
    const childTypeEntities = await Promise.all(
      childTypeIds.map(async (childTypeId) => {
        const childType = await this.childTypeService.findOneById({
          childTypeId,
        });
        if (!childType) {
          throw new UnprocessableEntityException(
            'childTypeId 값이 존재하지 않습니다.'
          );
        }

        const userChildType = new UserChildType();
        userChildType.users = userId;
        userChildType.childTypes = childType;
        return userChildType;
      })
    );

    await this.userChildTypesRepository.save(childTypeEntities);
  }
}
