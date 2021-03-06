import { EntityManager } from "typeorm";
import { Seeder } from '@modules/database/seeders/seeder.model';
import { ShopStore } from "@modules/shop/store/store.model";
import { hash } from 'argon2';
import { User } from "@modules/users/user.model";
import { ShopOffer } from "@modules/shop/offers/offer.model";
/**
 * @description Seed Palrey Shop Store and Offers
 * @param transaction 
 */
export async function transaction03(transaction: EntityManager, seederId: string, seederDescription: string) {
  // Create Vendor
  const vendor = transaction.save(User, {
    email: 'palrey@nairda.net',
    emailVerifiedAt: new Date(),
    mobilePhone: '58075153',
    lastName: 'Palmero Rey',
    password: await hash('sueños'),
    roles: ['VENDOR'],
    name: 'David',
  });

  // Create Store
  const store = await transaction.save(ShopStore, [{
    locality: { id: 1 },
    image: { id: 1 },
    description: 'Description',
    open: true,
    position: { id: 1 },
    title: 'Palrey',
    rating: 0,
    vendorId: (await vendor).id,
    validatedAt: new Date()
  }, {
    locality: { id: 1 },
    image: { id: 1 },
    description: 'Description',
    open: true,
    position: { id: 1 },
    title: 'Palrey 2',
    rating: 0,
    vendorId: (await vendor).id,
    validatedAt: new Date()
  }])

  // Save Offers
  await transaction.save(ShopOffer, [
    {
      store: store[0],
      title: 'Polvorón',
      category: { id: 'culinary' },
      description: 'Polvorón',
      image: { id: 1 },
      onsale: true,
      prices: {
        production: 0,
        sell: 5,
        vendor: 3
      },
      rating: 17,
      stock: {
        qty: 10,
        status: 'LIMITED'
      },
      type: 'PRODUCT',
      validatedAt: new Date()
    }, {
      store: store[0],
      title: 'Empanada',
      category: { id: 'culinary' },
      description: 'Empanada',
      image: { id: 1 },
      onsale: true,
      prices: {
        production: 0,
        sell: 5,
        vendor: 3
      },
      rating: 17,
      stock: {
        qty: 10,
        status: 'LIMITED'
      },
      type: 'PRODUCT',
      validatedAt: new Date()
    }, {
      store: store[0],
      title: 'Pizza Familiar Queso',
      category: { id: 'culinary' },
      description: 'Pizza Familiar Queso',
      image: { id: 1 },
      onsale: true,
      prices: {
        production: 0,
        sell: 280,
        vendor: 250
      },
      rating: 17,
      stock: {
        qty: 10,
        status: 'LIMITED'
      },
      type: 'PRODUCT',
      validatedAt: new Date()
    }, {
      store: store[0],
      title: 'Pizza Familiar Salchichas',
      category: { id: 'culinary' },
      description: 'Pizza Familiar Salchichas',
      image: { id: 1 },
      onsale: true,
      prices: {
        production: 0,
        sell: 380,
        vendor: 350
      },
      rating: 17,
      stock: {
        qty: 10,
        status: 'LIMITED'
      },
      type: 'PRODUCT',
      validatedAt: new Date()
    }, {
      store: store[0],
      title: 'Pizza Familiar Atun',
      category: { id: 'culinary' },
      description: 'Pizza Familiar Atun',
      image: { id: 1 },
      onsale: true,
      prices: {
        production: 0,
        sell: 550,
        vendor: 500
      },
      rating: 17,
      stock: {
        qty: 10,
        status: 'LIMITED'
      },
      type: 'PRODUCT',
      validatedAt: new Date()
    }, {
      store: store[0],
      title: 'Panetela',
      category: { id: 'culinary' },
      description: 'Panetela',
      image: { id: 1 },
      onsale: true,
      prices: {
        production: 0,
        sell: 550,
        vendor: 500
      },
      rating: 17,
      stock: {
        qty: 10,
        status: 'LIMITED'
      },
      type: 'PRODUCT',
      validatedAt: new Date()
    }, {
      store: store[0],
      title: 'Panetela Rellena',
      category: { id: 'culinary' },
      description: 'Panetela Rellena',
      image: { id: 1 },
      onsale: true,
      prices: {
        production: 0,
        sell: 550,
        vendor: 500
      },
      rating: 17,
      stock: {
        qty: 10,
        status: 'LIMITED'
      },
      type: 'PRODUCT',
      validatedAt: new Date()
    },
  ]);
  // Save Seeder
  await transaction.save(new Seeder(seederId, seederDescription));

}