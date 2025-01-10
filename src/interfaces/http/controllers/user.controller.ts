import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/user/dto/update-user.dto';
import { UserFacade } from 'src/interfaces/facades/user.facade';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid user data provided.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userFacade.createUser(createUserDto);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({ status: 200, description: 'User details updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid user update data provided.' })
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userFacade.updateUser(userId, updateUserDto);
  }

  @Get(':userId/point')
  @ApiOperation({ summary: 'Get user points' })
  @ApiResponse({ status: 200, description: 'User points retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getPoint(@Param('userId') userId: string) {
    return this.userFacade.getPoint(userId);
  }

  @Patch(':userId/point')
  @ApiOperation({ summary: 'Update user points (charge or deduct)' })
  @ApiResponse({ status: 200, description: 'User points updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid point update data provided.' })
  async updatePoint(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userFacade.updatePoint(userId, updateUserDto);
  }

  @Post(':userId/queue')
  @ApiOperation({ summary: 'Create a queue for user and generate token' })
  @ApiResponse({ status: 201, description: 'Queue created successfully with token.' })
  @ApiResponse({ status: 400, description: 'Invalid user ID provided.' })
  @ApiResponse({ status: 409, description: 'User already in a queue.' })
  async createQueue(@Param('userId') userId: string) {
    return this.userFacade.createQueue(userId);
  }

  @Get(':userId/queue/status')
  @ApiOperation({ summary: 'Get user queue status' })
  @ApiResponse({ status: 200, description: 'Queue status retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Queue not found.' })
  async getQueueStatus(@Param('userId') userId: string) {
    return this.userFacade.getQueueStatus(userId);
  }

  @Post(':userId/queue/clear')
  @ApiOperation({ summary: 'Clear the user queue' })
  @ApiResponse({ status: 200, description: 'Queue cleared successfully.' })
  @ApiResponse({ status: 404, description: 'Queue not found.' })
  async clearQueue(@Param('userId') userId: string) {
    return this.userFacade.clearQueue(userId);
  }
}
