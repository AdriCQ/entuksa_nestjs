import { Injectable } from "@nestjs/common";
import { InferSubjects, Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { User } from "../user.model";
/**
 * Casl action
 */
export enum CaslAction {
  MANAGE = 'MANAGE',
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

// type Subjects = InferSubjects<typeof Article | typeof User> | 'all';
type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[CaslAction, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[CaslAction, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.hasRole('DEVELOPER')) {
      can(CaslAction.MANAGE, 'all'); // read-write access to everything
    } else {
      can(CaslAction.READ, 'all'); // read-only access to everything
    }

    // can(CaslAction.UPDATE, Article, { authorId: user.id });
    // cannot(CaslAction.DELETE, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}