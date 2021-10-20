import { NestMiddleware, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Seeder } from './seeder.model';
import { transaction01, transaction02 } from './transactions'
/**
 * Seeder middleware
 */
@Injectable()
export class SeederMiddleware implements NestMiddleware {
  // to avoid roundtrips to db we store the info about whether
  // the seeding has been completed as boolean flag in the middleware
  // we use a promise to avoid concurrency cases. Concurrency cases may
  // occur if other requests also trigger a seeding while it has already
  // been started by the first request. The promise can be used by other
  // requests to wait for the seeding to finish.
  private isSeedingComplete: Promise<boolean>;

  constructor(
    private readonly entityManager: EntityManager,
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {

    if (await this.isSeedingComplete) {
      return next();
    }

    this.isSeedingComplete = (async () => {
      if (!await this.entityManager.findOne(Seeder, { id: 'initial-seeding' })) {
        await this.entityManager.transaction(async transaction => {
          // Initial Seeding
          await transaction01(transaction, 'initial-seeding', 'Seeds Default Image, Nairda user, Client Application');
        });
      }
      if (!await this.entityManager.findOne(Seeder, { id: 'shop-seeding' })) {
        await this.entityManager.transaction(async transaction => {
          // Initial Seeding
          await transaction02(transaction, 'shop-seeding', 'Seed Shop Categories, Map Positions and Map Localities');
        });
      }
      return true;
    })();

    await this.isSeedingComplete;

    next();
  }
}