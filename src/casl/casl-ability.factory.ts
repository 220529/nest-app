import { Injectable } from "@nestjs/common";
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  ExtractSubjectType,
  InferSubjects,
} from "@casl/ability";
import { Action } from "@/enums/action.enum";
import { User } from "@/user/entities/user.entity";
import { Work } from "@/work/entities/work.entity";

type Subjects = InferSubjects<typeof Work | typeof User> | "all";

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    console.log("user.isAdmin: ", user);

    // if (user.isAdmin) {
    //   can(Action.Manage, "all"); // 管理员有所有权限
    // } else {
    //   can(Action.Read, "all"); // 普通用户有读取权限
    // }

    // 用户可以更新自己的文章
    can(Action.Update, Work, { userId: user.id });

    // 不能删除已发布的文章
    // cannot(Action.Delete, Work, { status: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
