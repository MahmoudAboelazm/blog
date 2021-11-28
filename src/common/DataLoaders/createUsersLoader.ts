import * as DataLoader from 'dataloader';
import { User } from '../../user/models/user.model';
import { UsersService } from '../../user/users.service';

export function createUsersLoader(usersService: UsersService) {
  return new DataLoader<string, User>(async (userIds) => {
    const users = await usersService.findByIds(userIds as string[]);
    const userIdToUser: Record<number, User> = {};

    users.forEach((u) => {
      userIdToUser[u._id] = u;
    });

    return userIds.map((userid) => userIdToUser[userid]);
  });
}
