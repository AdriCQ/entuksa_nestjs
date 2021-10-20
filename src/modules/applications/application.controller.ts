import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApplicationService } from "./application.service";
import { SetupClientResponseDto, SetupClientResquestDto } from './application.dto';
import { JwtAuthGuard } from '../users/auth/auth.guard';
import { PermissionsGuard } from '../users/casl/casl.guard';
/**
 * Application controller
 */
@Controller('/application')
@ApiTags('Application')
export class ApplicationController {
  /**
   * Creates an instance of application controller.
   * @param service 
   */
  constructor(private readonly service: ApplicationService) { }
  /**
   * Gets token
   * @param appId 
   * @returns token 
   */
  @Get('/token/:id')
  async getToken(@Param('id') appId: number): Promise<string> {
    return await this.service.getToken(appId);
  }
  /**
   * Setups client
   * @param body 
   * @returns client 
   */
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/setup')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: () => SetupClientResponseDto })
  async setupClient(@Body() body: SetupClientResquestDto, @Req() req): Promise<SetupClientResponseDto> {
    body.user = req.user;
    body.app = req.application;
    return await this.service.setup(body);
  }
}