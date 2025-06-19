import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { permittedFieldsOf } from "@casl/ability/extra";
import { CaslAbilityFactory } from "@/casl/casl-ability.factory";
import { IS_PUBLIC_KEY } from "@/common/decorators/public.decorator";
import {
  CASL_SUBJECT,
  CASL_ACTION,
} from "@/common/decorators/casl-subject.decorator";

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 查看此条件
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // 假设用户已通过认证
    const ability = this.abilityFactory.createForUser(user);

    // 获取 Controller 的 Subject（如 Work）
    const subject = this.reflector.get(CASL_SUBJECT, context.getClass());
    if (!subject) return true; // 如果没有 Subject，放行

    // 获取 Handler 的 Action（如 'update'）
    const action = this.reflector.get(CASL_ACTION, context.getHandler());
    if (!action) return true; // 如果没有 Action，放行

    // 动态加载 Subject（如从数据库查询 Work）
    let subjectInstance: any;
    if (typeof subject === "function") {
      // 如果是 Class，尝试从请求参数加载（如 /works/:id）
      const id = request.params.id;
      subjectInstance = await subject.findOne({
        where: { id },
      });
    } else {
      // 直接使用静态 Subject（如 'all'）
      subjectInstance = subject;
    }

    if (request.body) {
      // 1. 获取所有允许的字段
      const editableFields = permittedFieldsOf(ability, action, subject, {
        fieldsFrom: (rule) => rule.fields || [],
      });

      // 2. 检查是否存在非法字段
      const invalidFields = Object.keys(request.body)?.filter(
        (field) => !editableFields.includes(field)
      );

      if (invalidFields.length > 0) {
        throw new ForbiddenException(
          `没有权限修改字段: ${invalidFields.join(", ")}`
        );
      }
    }

    // 3. 检查整体权限（确保用户有权操作该资源）
    if (ability.cannot(action, subjectInstance)) {
      throw new ForbiddenException(`没有权限执行 ${action} 操作`);
    }

    return true;
  }
}
