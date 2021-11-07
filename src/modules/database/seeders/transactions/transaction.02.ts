import { EntityManager } from "typeorm";
import { Seeder } from '@modules/database/seeders/seeder.model';
import { Category } from '@modules/shop/categories/category.model';
import { MapPosition } from "@modules/map/positions/position.model";
import { Locality } from "@modules/map/localities/locality.model";
/**
 * @description Seed Shop Categories, Map Positions and Map Localities
 * @param transaction 
 */
export async function transaction02(transaction: EntityManager, seederId: string, seederDescription: string) {
  // ShopCategory
  await transaction.save(Category, [{
    id: 'culinary',
    title: 'Culinario',
    description: 'Alimentos',
    icon: 'mdi-cart'
  }]);
  // Map Position
  const position = await transaction.save(MapPosition, [{
    address: 'Palmira',
    coordinate: { lat: 0, lng: 0 },
    validatedAt: new Date(),
  }]);
  await transaction.save(Locality, [{
    position: position[0],
    title: 'Palmira',
    description: 'Palmira'
  }])

  // Save Seeder
  await transaction.save(new Seeder(seederId, seederDescription));

}