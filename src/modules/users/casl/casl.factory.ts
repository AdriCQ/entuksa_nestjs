import { Injectable } from '@nestjs/common';
import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { User } from '../user.model';
import { ShopStore } from '@modules/shop/store/store.model';
/**
 * Casl action
 */
export enum Permission {
  MANAGE = 'MANAGE',
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

// type Subjects = InferSubjects<typeof Article | typeof User> | 'all';
type Subjects = InferSubjects<typeof User | typeof ShopStore> | 'all';

export type AppPermission = Ability<[Permission, Subjects]>;

@Injectable()
export class PermissionFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Permission, Subjects]>
    >(Ability as AbilityClass<AppPermission>);

    if (user.hasAnyRole(['DEVELOPER', 'ADMIN'])) {
      can(Permission.CREATE, 'all'); // read-write access to everything
      can(Permission.DELETE, 'all'); // read-write access to everything
      can(Permission.READ, 'all'); // read-write access to everything
      can(Permission.UPDATE, 'all'); // read-write access to everything
      can(Permission.MANAGE, 'all'); // read-write access to everything
    }
    /**
     * -----------------------------------------
     *	Vendor
     * -----------------------------------------
     */
    else if (user.hasRole('VENDOR')) {
      can(Permission.CREATE, ShopStore);
      can(Permission.UPDATE, ShopStore, { vendor: user });
      can(Permission.DELETE, ShopStore, { vendor: user });
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
