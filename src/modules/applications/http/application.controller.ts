import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
// App Module
import { ApplicationService } from "./application.service";
import { ApplicationSettingsDto, SetupAppResponseDto, SetupAppResquestDto } from './application.dto';
import { Application } from "./application.model";
// User module
import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { Role, RolesGuard } from '@modules/users/casl/helpers/roles';
import { Roles } from "@modules/users/auth/roles.decorator";
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
  constructor(private readonly service: ApplicationService) {}
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.DEVELOPER)
  @Patch('/setup/save-settings')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: () => Application })
  async saveSettings(@Body() _body: ApplicationSettingsDto, @Req() req): Promise<Application> {
    // const user: User = req.user;
    const app: Application = req.application;
    return await this.service.saveSettings(app, _body);
  }
  /**
   * Setups client
   * @param body 
   * @returns client 
   */
  @UseGuards(JwtAuthGuard)
  @Get('/setup')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: () => SetupAppResponseDto })
  async setupClient(@Body() body: SetupAppResquestDto, @Req() req): Promise<SetupAppResponseDto> {
    body.user = req.user;
    body.app = req.application;
    return await this.service.setup(body);
  }
}