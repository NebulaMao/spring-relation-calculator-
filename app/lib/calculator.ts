import { Generation, Gender, CalculationResult } from '../types/relation';
import { GENERATIONS_DATA, getTitleByDiff, getDescription } from '../data/generations';

/**
 * 辈份计算核心算法
 */
export function calculateRelation(
  myGeneration: Generation,
  theirGeneration: Generation,
  gender: Gender
): CalculationResult {
  const generationDiff = theirGeneration - myGeneration;

  const isElder = generationDiff < 0;
  const isSelf = generationDiff === 0;
  const title = getTitleByDiff(generationDiff, gender);
  const description = getDescription(generationDiff);

  return {
    generationDiff,
    isElder,
    isSelf,
    title,
    description,
  };
}

/**
 * 将代数差转换为 Generation 枚举
 */
export function diffToGeneration(diff: number): Generation {
  // 确保在有效范围内
  const clampedDiff = Math.max(-5, Math.min(5, diff));
  return clampedDiff as Generation;
}

/**
 * 计算两个辈份之间的代数差
 */
export function getGenerationDiff(g1: Generation, g2: Generation): number {
  return g2 - g1;
}

/**
 * 判断是否为有效辈份
 */
export function isValidGeneration(value: number): boolean {
  return value >= -5 && value <= 5;
}

/**
 * 获取辈份层级描述
 */
export function getGenerationLevel(generation: Generation): string {
  const absValue = Math.abs(generation);
  if (generation === Generation.SELF) return '自己';
  if (generation < Generation.SELF) {
    return `第 ${absValue} 代长辈`;
  }
  return `第 ${absValue} 代晚辈`;
}
