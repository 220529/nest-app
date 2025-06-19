import { Injectable } from "@nestjs/common";
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  ExtractSubjectType,
  InferSubjects,
} from "@casl/ability";
import { Action } from "@/common/enums/action.enum";
import { Work } from "@/work/entities/work.entity";
import { User } from "@/user/entities/user.entity";

// 1. 定义类型
export type Subjects = InferSubjects<typeof Work | typeof User> | "all";
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: { id: number; roleIds: number[] }) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility
    );
    // console.log("caslAbilityFactory createForUser", user.roleIds);
    if (user.roleIds.includes(3)) {
      can(Action.Manage, "all");
    } else {
      can(Action.Update, Work, ["title", "content"], { userId: user.id });
      can(Action.Delete, Work, { userId: user.id });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
