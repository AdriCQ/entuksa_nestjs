import { NestMiddleware, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { Seeder } from './seeder.model';
import { User } from '@modules/users/user.model';
import { hash } from 'argon2';
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
      // seeding has already taken place,
      // we can short-circuit to the next middleware
      return next();
    }

    this.isSeedingComplete = (async () => {
      // for example you start with an initial seeding entry called 'initial-seeding'
      // on 2019-06-27. if 'initial-seeding' already exists in db, then this
      // part is skipped
      if (!await this.entityManager.findOne(Seeder, { id: 'initial-seeding' })) {
        await this.entityManager.transaction(async transactionalEntityManager => {
          await transactionalEntityManager.save(User, [
            {
              name: 'Nairda',
              lastName: 'Developer',
              email: 'acq95@nauta.cu',
              mobilePhone: '53375180',
              roles: ['DEVELOPER'],
              password: await hash('password')
            }
          ]);
          await transactionalEntityManager.save(new Seeder('initial-seeding'));
        });
      }

      // now a month later on 2019-07-25 you add another seeding
      // entry called 'another-seeding-round' since you want to initialize
      // entities that you just created a month later
      // since 'initial-seeding' already exists it is skipped but 'another-seeding-round'
      // will be executed now.
      // if (!await this.entityManager.findOne(SeedingLogEntry, { id: 'another-seeding-round' })) {
      //   await this.entityManager.transaction(async transactionalEntityManager => {
      //     await transactionalEntityManager.save(MyNewEntity, initalSeedingForNewEntity);
      //     // persist in db that 'another-seeding-round' is complete
      //     await transactionalEntityManager.save(new SeedingLogEntry('another-seeding-round'));
      //   });
      // }

      return true;
    })();

    await this.isSeedingComplete;

    next();
  }
}