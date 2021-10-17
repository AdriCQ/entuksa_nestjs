import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Request, NextFunction } from 'express';
import { Repository } from "typeorm";
import { Application } from './application.model';
/**
 * Application Middleware
 */
@Injectable()
export class ApplicationMiddleware implements NestMiddleware {
  /**
   * Creates an instance of application Middleware.
   * @param repo 
   */
  constructor(@InjectRepository(Application) private readonly repo: Repository<Application>) { }
  /**
   * Uses application Middleware
   * @param req 
   * @param res 
   * @param next 
   */
  async use(req: Request, res: any, next: NextFunction) {
    try {
      const header = JSON.parse(JSON.stringify(req.headers));
      console.log(header['x-app-token']);
      if (header['x-app-token']) {
        const appTokenHeader: string = header['x-app-token'];
        const appId = Number(appTokenHeader.split('|')[0]);
        const appToken = appTokenHeader.split('|')[1];
        // Get App
        const app = await this.repo.findOne(appId);
        if (!app) {
          next(new HttpException('No se encontró la aplicación', 400));
        }
        const check = await app.validateToken(appToken);
        if (!check) {
          next(new HttpException('Aplicación no autorizada', 401));
        }
        // Inject app
        req.body['application'] = app;
        next();
      } else
        next(new HttpException('No se encontró el identificador de aplicación', 400));
    } catch (_err) {
      console.log(_err)
    }
  }

}