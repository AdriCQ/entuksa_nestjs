import { } from "@nestjs/swagger";
import { Controller, Get, Param } from '@nestjs/common'
import { ApplicationService } from "./application.service";
/**
 * Application controller
 */
@Controller('/application')
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
}