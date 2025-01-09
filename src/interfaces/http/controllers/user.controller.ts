import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "src/app/user/dto/create-user.dto";
import { UpdateUserDto } from "src/app/user/dto/update-user.dto";
import { UserFacade } from "src/interfaces/facades/user.facade";

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userFacade.createUser(createUserDto);
  }

  @Get(':id/point')
  @ApiOperation({ summary: 'Get user points' })
  @ApiResponse({ status: 200, description: 'User points retrieved successfully.' })
  async getPoint(@Param('id') userId: string) {
    return this.userFacade.getPoint(userId);
  }

  @Patch(':id/point')
  @ApiOperation({ summary: 'Partially update user points (charge or deduct)' })
  @ApiResponse({ status: 200, description: 'User points updated successfully.' })
  async updatePoint(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userFacade.updatePoint(userId, updateUserDto);
  }

  @Post(':id/queue')
  @ApiOperation({ summary: 'Create a queue for user and generate token' })
  @ApiResponse({ status: 201, description: 'Queue created successfully with token.' })
  async createQueue(@Param('id') userId: string) {
    return this.userFacade.createQueue(userId);
  }

  @Get(':id/queue/status')
  @ApiOperation({ summary: 'Get user queue status' })
  @ApiResponse({ status: 200, description: 'Queue status retrieved successfully.' })
  async getQueueStatus(@Param('id') userId: string) {
    return this.userFacade.getQueueStatus(userId);
  }

  @Post(':id/queue/clear')
  @ApiOperation({ summary: 'Clear the user queue' })
  @ApiResponse({ status: 200, description: 'Queue cleared successfully.' })
  async clearQueue(@Param('id') userId: string) {
    return this.userFacade.clearQueue(userId);
  }
}
