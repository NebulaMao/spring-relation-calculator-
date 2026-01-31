import { Generation, GenerationInfo } from '../types/relation';

/**
 * 辈份对照表数据
 */
export const GENERATIONS_DATA: GenerationInfo[] = [
  {
    value: Generation.GREAT_GREAT_GRANDFATHER,
    label: '高祖父',
    maleTitle: '高祖父',
    femaleTitle: '高祖母',
  },
  {
    value: Generation.GREAT_GRANDFATHER,
    label: '曾祖父',
    maleTitle: '曾祖父',
    femaleTitle: '曾祖母',
  },
  {
    value: Generation.GRANDFATHER,
    label: '祖父',
    maleTitle: '祖父',
    femaleTitle: '祖母',
  },
  {
    value: Generation.UNCLE,
    label: '叔伯',
    maleTitle: '叔伯',
    femaleTitle: '婶婶',
  },
  {
    value: Generation.PARENT,
    label: '父母',
    maleTitle: '父亲',
    femaleTitle: '母亲',
  },
  {
    value: Generation.SELF,
    label: '自己',
    maleTitle: '自己',
    femaleTitle: '自己',
  },
  {
    value: Generation.CHILD,
    label: '子女',
    maleTitle: '儿子',
    femaleTitle: '女儿',
  },
  {
    value: Generation.NIECE_NEPHEW,
    label: '侄子',
    maleTitle: '侄子',
    femaleTitle: '侄女',
  },
  {
    value: Generation.GRANDCHILD,
    label: '孙子女',
    maleTitle: '孙子',
    femaleTitle: '孙女',
  },
  {
    value: Generation.GREAT_GRANDCHILD,
    label: '曾孙',
    maleTitle: '曾孙',
    femaleTitle: '曾孙女',
  },
  {
    value: Generation.GREAT_GREAT_GRANDCHILD,
    label: '玄孙',
    maleTitle: '玄孙',
    femaleTitle: '玄孙女',
  },
];

/**
 * 根据代数差获取称呼
 */
export function getTitleByDiff(diff: number, gender: 'male' | 'female'): string {
  const info = GENERATIONS_DATA.find((g) => g.value === diff);
  if (!info) {
    // 超出范围时的通用称呼
    if (diff < Generation.GREAT_GREAT_GRANDFATHER) {
      return gender === 'male' ? '祖先' : '祖先';
    }
    if (diff > Generation.GREAT_GREAT_GRANDCHILD) {
      return gender === 'male' ? '后裔' : '后裔';
    }
    return '未知';
  }
  return gender === 'male' ? info.maleTitle : info.femaleTitle;
}

/**
 * 根据代数差获取描述
 */
export function getDescription(diff: number): string {
  if (diff === 0) return '同辈，自己';
  if (diff === 1) return '晚一辈，子女';
  if (diff === 2) return '晚两辈，孙子女';
  if (diff === 3) return '晚三辈，曾孙子女';
  if (diff === 4) return '晚四辈，玄孙子女';
  if (diff === 5) return '晚五辈';
  if (diff === -1) return '长辈，父母';
  if (diff === -2) return '上两辈，祖辈';
  if (diff === -3) return '上三辈，曾祖辈';
  if (diff === -4) return '上四辈，高祖辈';
  if (diff === -5) return '上五辈';
  return `${diff > 0 ? '晚' : '早'}${Math.abs(diff)}辈`;
}

/**
 * 根据 Generation 枚举获取信息
 */
export function getGenerationInfo(value: Generation): GenerationInfo | undefined {
  return GENERATIONS_DATA.find((g) => g.value === value);
}

/**
 * 获取所有辈份选项（用于选择器）
 */
export function getGenerationOptions() {
  return GENERATIONS_DATA.map((g) => ({
    value: g.value,
    label: g.label,
  }));
}
