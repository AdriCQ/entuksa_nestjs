import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}


  @Get('/csrf-cookie')
  @ApiResponse({ status: 200 })
  csrfToken(@Req() _req, @Res({ passthrough: true }) _resp) {
    _resp.cookie('XSRF-TOKEN', _req.csrfToken());
    return;
  }
}
