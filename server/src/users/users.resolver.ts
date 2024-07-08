import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserNotFoundException } from './user-not-found.exception';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  
  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Query(() => User, { name: 'userByEmail', nullable: true })
  async getUserByEmail(@Args('email', { type: () => String }) email: string): Promise<User | null> {
    try {
      return await this.usersService.getUserByEmail(email);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return null;
      }
      throw error;
    }
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserInput);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}