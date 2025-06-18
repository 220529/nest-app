import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class JsonSerializePipe implements PipeTransform {
  /**
   * 将输入值转换为JSON字符串（若需要）
   * @param value 任意输入值
   * @returns 原始字符串或序列化后的JSON字符串
   */
  transform(value: unknown): string {
    console.log("JsonSerializePipe", value);
    // 已经是字符串则直接返回
    if (typeof value === "string") return value;

    // 其他情况直接尝试JSON序列化
    try {
      return JSON.stringify(value);
    } catch (e) {
      throw new BadRequestException("Invalid JSON data");
    }
  }
}
