import { RelationRecord } from './record';

/**
 * LocalStorage 存储结构
 */
export interface StorageSchema {
  version: number;
  records: RelationRecord[];
  lastModified: number;
}

/**
 * 存储键名
 */
export const STORAGE_KEY = 'spring-festival-relation-records';

/**
 * 存储版本号
 */
export const STORAGE_VERSION = 1;
