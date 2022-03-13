import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
// Local
import { CreateUserMapPositionDto } from '../dtos';
import { MapUserPositionService } from '../services/userPosition.service';
import { MapPositionsService } from '../services/positions.service';
import { UserMapPosition } from '../entitites/userPosition.entity';
// Modules
import { IReqAuth } from '@modules/types';
import { JwtAuthGuard } from '@modules/users/auth';
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
    private readonly $mapService: MapPositionsService

  ) {}
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
   * @param _mapPositionId number
   * @param _req IReqAuth
   * @returns Promise<UserMapPosition>
   */
  @Delete('/:id')
  @ApiResponse({ status: 200, type: () => UserMapPosition })
  async delete(@Param('id') _mapPositionId: number, @Req() _req: IReqAuth): Promise<UserMapPosition> {
    const user = _req.user;
    const position = await this.$service.findOne({ id: _mapPositionId });
    // Check if belongs to user
    if (!position || position.user.id !== user.id)
      throw new HttpException('Intenta acceder a datos que no le pertenecen', 401);
    await this.$service.delete({ id: _mapPositionId });
    await this.$mapService.delete({ id: position.position.id });
    return position;
  }
  /**
   * List userPositions
   * @param _req 
   * @returns Promise<UserMapPosition[]>
   */
  @Get('/')
  @ApiResponse({ status: 200, type: () => UserMapPosition, isArray: true })
  async list(@Req() _req: IReqAuth): Promise<UserMapPosition[]> {
    const user = _req.user;
    return await this.$service.list({ user });
  }
  /**
   * update
   * @param _posId number
   * @param _body UserMapPosition
   * @param _req IReqAuth
   * @returns Promise<UserMapPosition>
   */
  @Put('/:id')
  @ApiResponse({ status: 200, type: () => UserMapPosition })
  async update(@Param('id') _posId: number, @Body() _body: UserMapPosition, @Req() _req: IReqAuth) {
    const user = _req.user;
    const position = await this.$service.findOne({ id: _posId });
    // Check if belongs to user
    if (!position || !user.id || !position.user || !position.user.id || position.user.id !== user.id)
      throw new HttpException('Intenta acceder a datos que no le pertenecen', 401);
    return this.$service.update(_posId, _body);
  }
}