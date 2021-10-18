import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Log } from './log.model';
import { Repository } from 'typeorm';

/**
 * Log service
 */
@Injectable()
export class LogService {
  /**
   * Creates an instance of log service.
   * @param repo 
   */
  constructor(@InjectRepository(Log) private readonly repo: Repository<Log>) { }
  /**
   * Infos log service
   * @param _p 
   * @returns  
   */
  async info(_p: { namespace: string, content: any }) {
    return await this.repo.save({
      content: _p.content,
      namespace: _p.namespace,
      type: 'INFO'
    })
  }
  /**
   * Warning log service
   * @param _p 
   * @returns  
   */
  async warning(_p: { namespace: string, content: any }) {
    return await this.repo.save({
      content: _p.content,
      namespace: _p.namespace,
      type: 'WARNING'
    })
  }
  /**
   * Errors log service
   * @param _p 
   * @returns  
   */
  async error(_p: { namespace: string, content: any }) {
    return await this.repo.save({
      content: _p.content,
      namespace: _p.namespace,
      type: 'ERROR'
    })
  }
}