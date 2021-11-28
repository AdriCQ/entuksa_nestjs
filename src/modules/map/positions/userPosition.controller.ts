import { Body, Controller, Delete, Get, HttpException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
// Local
import { CreateUserMapPositionDto } from './position.dto';
import { MapUserPositionService } from './userPosition.service';
import { UserMapPosition } from './userPosition.model';
// Modules
import { IReqAuth } from '@modules/types';
import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
/**
 * MapPositionController
 */
@Controller('api/map/user-positions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Map User Positions', 'User')
export class MapUserPositionController {
  /**
   * constructor
   * @param $service 
   */
  constructor(
    private readonly $service: MapUserPositionService,

  ) { }
  /**
   * Create User Position
   * @param _body 
   * @param _req 
   * @returns 
   */
  @Post('/')
  @ApiResponse({ status: 201, type: () => UserMapPosition })
  async create(@Body() _body: CreateUserMapPositionDto, @Req() _req: IReqAuth): Promise<UserMapPosition> {
    const user = _req.user;
    _body.user = user;
    return await this.$service.create(_body);
  }
  /**
   * delete user position
   * @param _mapPositionId 
   * @param _req 
   */
  @Delete('/:id')
  @ApiResponse({ status: 200, type: () => UserMapPosition })
  async delete(@Param('id') _mapPositionId: number, @Req() _req: IReqAuth): Promise<UserMapPosition> {
    const user = _req.user;
    const position = await this.$service.findOne({ id: _mapPositionId });
    // Check if belongs to user
    if (!position || position.user.id !== user.id)
      throw new HttpException('Intenta borrar datos que no le pertenecen', 401);
    this.$service.delete({ id: _mapPositionId });
    return position;
  }
  /**
   * List userPositions
   * @param _req 
   * @returns 
   */
  @Get('/')
  @ApiResponse({ status: 200, type: () => UserMapPosition, isArray: true })
  async list(@Req() _req: IReqAuth): Promise<UserMapPosition[]> {
    const user = _req.user;
    return await this.$service.list({ user });
  }
}