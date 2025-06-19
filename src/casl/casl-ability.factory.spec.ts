import { CaslAbilityFactory } from "@/casl/casl-ability.factory";
import { Action } from "@/common/enums/action.enum";
import { Work } from "@/work/entities/work.entity"; // 导入Work实体

describe("CaslAbilityFactory", () => {
  let factory: CaslAbilityFactory;

  // 使用Partial<Work>模拟测试数据，避免必须提供所有字段
  const mockWork = (id: number, userId: number): Partial<Work> => ({
    id,
    userId,
    title: "Test Work",
    // 其他必要字段可以在这里添加，但Partial使它们可选
  });

  beforeEach(() => {
    factory = new CaslAbilityFactory();
  });

  describe("普通用户权限", () => {
    const user = { id: 1, roleIds: [2] };
    let ability: ReturnType<CaslAbilityFactory["createForUser"]>;

    beforeEach(() => {
      ability = factory.createForUser(user);
    });

    it("允许用户修改自己的Work的非id字段", () => {
      const ownWork = mockWork(1, user.id) as Work;

      expect(ability.can(Action.Update, ownWork)).toBe(true);
      expect(ability.can(Action.Update, ownWork, "title")).toBe(true);
    });

    it("禁止用户修改自己的Work的id字段", () => {
      const ownWork = mockWork(1, user.id) as Work;

      expect(ability.can(Action.Update, ownWork, "id")).toBe(false);
    });

    it("禁止用户修改别人的Work", () => {
      const otherWork = mockWork(2, 999) as Work;

      expect(ability.can(Action.Update, otherWork)).toBe(false);
      expect(ability.can(Action.Update, otherWork, "title")).toBe(false);
    });
  });

  describe("管理员权限", () => {
    const admin = { id: 1, roleIds: [3] };
    let ability: ReturnType<CaslAbilityFactory["createForUser"]>;

    beforeEach(() => {
      ability = factory.createForUser(admin);
    });

    it("允许管理员修改任何Work的任何字段", () => {
      const anyWork = mockWork(1, 999) as Work;

      expect(ability.can(Action.Update, anyWork)).toBe(true);
      expect(ability.can(Action.Update, anyWork, "id")).toBe(true);
      expect(ability.can(Action.Update, anyWork, "title")).toBe(true);
    });
  });

  describe("字段级权限", () => {
    it("禁止普通用户修改敏感字段", () => {
      const user = { id: 1, roleIds: [2] };
      const ability = factory.createForUser(user);
      const work = mockWork(1, user.id) as Work;

      // 假设这些是敏感字段
      expect(ability.can(Action.Update, work, "status")).toBe(false);
      expect(ability.can(Action.Update, work, "createdAt")).toBe(false);
    });
  });
});
