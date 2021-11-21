import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
// Local
import { MapPositionsService } from './positions.service';
import { UserMapPosition } from './userPosition.model';
// Modules
import { IReqAuth } from '@modules/types';
import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { CreateUserMapPositionDto } from './position.dto';
/**
 * MapPositionController
 */
@Controller('api/map/positions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Map Positions')
export class MapPositionController {
  /**
   * constructor
   * @param $service 
   */
  constructor(
    private $service: MapPositionsService
  ) { }
  /**
   * Create User Position
   * @param _body 
   * @param _req 
   * @returns 
   */
  @Post('/users')
  @ApiResponse({ status: 201, type: () => UserMapPosition })
  async createUserPosition(@Body() _body: CreateUserMapPositionDto, @Req() _req: IReqAuth): Promise<UserMapPosition> {
    const user = _req.user;
    _body.user = user;
    return await this.$service.createUserPosition(_body);
  }
  /**
   * userPositions
   * @param _req 
   * @returns 
   */
  @Get('/users')
  @ApiResponse({ status: 200, type: () => UserMapPosition, isArray: true })
  async userPositions(@Req() _req: IReqAuth): Promise<UserMapPosition[]> {
    const user = _req.user;
    return await this.$service.userPositions({ user });
  }
}