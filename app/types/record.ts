import { Generation } from './relation';

/**
 * 记录类型定义
 */
export interface RelationRecord {
  id: string;
  name: string;
  myGeneration: Generation;
  theirGeneration: number;
  gender: 'male' | 'female';
  createdAt: number;
  updatedAt: number;
}

/**
 * 积木块类型
 */
export interface BlockItem {
  id: string;
  generation: Generation;
  gender: Gender;
  title: string;
}

/**
 * 积木链结果
 */
export interface BlockChainResult {
  nodes: RelationNode[];
  finalGeneration: number;
  finalTitle: string;
  totalSteps: number;
}
