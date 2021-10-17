import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.model';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './application.dto';
/**
 * Application service
 */
@Injectable()
export class ApplicationService {
  /**
   * Creates an instance of application service.
   * @param repo 
   */
  constructor(@InjectRepository(Application) private readonly repo: Repository<Application>) { }
  /**
   * Gets token
   * @param _appId 
   * @returns token 
   */
  async getToken(_appId: number): Promise<string> {
    const app = await this.repo.findOne(_appId);
    if (!app)
      throw new HttpException('No se econtró la Aplicación', 400);
    const token = await app.hashToken();
    return `${app.id}|${token}`
  }
  /**
   * Seed application service
   * @returns  
   */
  async seed() {
    const applications: CreateApplicationDto[] = [];
    applications.push({
      title: 'Palrey-Client',
      description: 'Palrey Client',
      settings: {
        open: true
      }
    });
    return await this.repo.save(applications);
  }
}