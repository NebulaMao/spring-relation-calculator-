import { Generation, Gender, RelationNode } from '../types/relation';
import { GENERATIONS_DATA, getTitleByDiff } from '../data/generations';
import { BlockItem, BlockChainResult } from '../types/record';

/**
 * 积木链计算器
 */

/**
 * 积木块选项列表
 */
export const BLOCK_OPTIONS: BlockItem[] = [
  { id: 'father', generation: Generation.PARENT, gender: Gender.MALE, title: '父亲' },
  { id: 'mother', generation: Generation.PARENT, gender: Gender.FEMALE, title: '母亲' },
  { id: 'son', generation: Generation.CHILD, gender: Gender.MALE, title: '儿子' },
  { id: 'daughter', generation: Generation.CHILD, gender: Gender.FEMALE, title: '女儿' },
  { id: 'brother', generation: Generation.SELF, gender: Gender.MALE, title: '兄弟' },
  { id: 'sister', generation: Generation.SELF, gender: Gender.FEMALE, title: '姐妹' },
  { id: 'uncle', generation: Generation.UNCLE, gender: Gender.MALE, title: '叔伯' },
  { id: 'aunt', generation: Generation.UNCLE, gender: Gender.FEMALE, title: '婶婶' },
  { id: 'nephew', generation: Generation.NIECE_NEPHEW, gender: Gender.MALE, title: '侄子' },
  { id: 'niece', generation: Generation.NIECE_NEPHEW, gender: Gender.FEMALE, title: '侄女' },
];

/**
 * 计算积木链结果
 * 从"自己"开始，通过选择的积木块构建关系链
 */
export function calculateBlockChain(blocks: BlockItem[]): BlockChainResult {
  if (blocks.length === 0) {
    return {
      nodes: [],
      finalGeneration: 0,
      finalTitle: '自己',
      totalSteps: 0,
    };
  }

  let currentGeneration = 0; // 从"自己"开始
  const nodes: RelationNode[] = [];

  for (const block of blocks) {
    // 计算新的辈份
    const newGeneration = currentGeneration + block.generation;
    const title = getTitleByDiff(newGeneration, block.gender);

    nodes.push({
      generation: block.generation,
      gender: block.gender,
      title,
    });

    currentGeneration = newGeneration;
  }

  // 获取最终的称呼（以当前代数差的视角）
  const finalDiff = currentGeneration;
  const lastBlock = blocks[blocks.length - 1];
  const finalTitle = getTitleByDiff(finalDiff, lastBlock.gender);

  return {
    nodes,
    finalGeneration: currentGeneration,
    finalTitle,
    totalSteps: blocks.length,
  };
}

/**
 * 计算从自己到目标的代数差
 */
export function calculateGenerationDiff(blocks: BlockItem[]): number {
  if (blocks.length === 0) return 0;

  return blocks.reduce((sum, block) => sum + block.generation, 0);
}

/**
 * 获取关系的方向描述
 */
export function getRelationDirection(diff: number): string {
  if (diff === 0) return '自己';
  if (diff === 1) return '子女辈';
  if (diff === 2) return '孙辈';
  if (diff === 3) return '曾孙辈';
  if (diff === 4) return '玄孙辈';
  if (diff > 4) return '更晚辈';
  if (diff === -1) return '父母辈';
  if (diff === -2) return '祖辈';
  if (diff === -3) return '曾祖辈';
  if (diff === -4) return '高祖辈';
  return '更早辈';
}
