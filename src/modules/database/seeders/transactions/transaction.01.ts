import { EntityManager } from "typeorm";
import { User } from '@modules/users/users';
import { hash } from 'argon2';
import { Image } from "@modules/images";
import { Application } from '@modules/applications';
import { Seeder } from '@modules/database/seeders/seeder.model';
/**
 * @description Seed Default Image, Developer user, Client application
 * @param transaction 
 */
export async function transaction01(transaction: EntityManager, seederId: string, seederDescription: string) {
  // Seed Images
  await transaction.save(Image, [
    {
      tags: ['default'],
      title: 'Default-Image',
      paths: { lg: 'storage/app/images/default.jpg', md: 'storage/app/images/default.jpg', sm: 'storage/app/images/default.jpg' },
    },
    {
      tags: ['logo', 'nairda'],
      title: 'NairdaSoft-Logo',
      paths: { lg: 'storage/app/images/nairda_logo.png', md: 'storage/app/images/nairda_logo.png', sm: 'storage/app/images/nairda_logo.png' },
    }
  ]);
  // Seed Users
  await transaction.save(User, [
    {
      name: 'Nairda',
      lastName: 'Developer',
      email: 'acq95@nauta.cu',
      emailVerifiedAt: new Date(),
      mobilePhone: '53375180',
      roles: ['DEVELOPER'],
      password: await hash('password')
    }
  ]);
  // Seed Application
  await transaction.save(Application, [{
    title: 'EnTuKsa-Client',
    description: 'Clientes de Palrey',
    settings: {
      open: true,
    }
  }]);

  await transaction.save(Application, [{
    title: 'EnTuKsa-Admin',
    description: 'Administracion de tiendas, ofertas y pedidos',
    settings: {
      open: true
    }
  }]);
  // Save Seeder
  await transaction.save(new Seeder(seederId, seederDescription));

}