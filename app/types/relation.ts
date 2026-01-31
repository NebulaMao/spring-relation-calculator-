/**
 * 辈份枚举定义
 * 负数表示长辈，正数表示晚辈，0表示自己
 */
export enum Generation {
  // 长辈（高祖父到父亲）
  GREAT_GREAT_GRANDFATHER = -5, // 高祖父
  GREAT_GRANDFATHER = -4,       // 曾祖父
  GRANDFATHER = -3,             // 祖父
  UNCLE = -2,                   // 叔伯（与父亲同辈）
  PARENT = -1,                  // 父母

  // 自己
  SELF = 0,

  // 晚辈（儿子到玄孙）
  CHILD = 1,                    // 子女
  NIECE_NEPHEW = 2,             // 侄子/侄女（与子女同辈）
  GRANDCHILD = 3,               // 孙子女
  GREAT_GRANDCHILD = 4,         // 曾孙子女
  GREAT_GREAT_GRANDCHILD = 5,   // 玄孙子女
}

/**
 * 性别枚举
 */
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

/**
 * 辈份信息接口
 */
export interface GenerationInfo {
  value: Generation;
  label: string;
  maleTitle: string;
  femaleTitle: string;
}

/**
 * 计算结果接口
 */
export interface CalculationResult {
  generationDiff: number; // 代数差（对方 - 自己）
  isElder: boolean;      // 是否是长辈
  isSelf: boolean;       // 是否是自己
  title: string;         // 称呼
  description: string;   // 描述
}

/**
 * 关系链节点
 */
export interface RelationNode {
  generation: Generation;
  gender: Gender;
  title: string;
}
