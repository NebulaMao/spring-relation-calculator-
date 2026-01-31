import { RelationRecord } from '../types/record';
import { STORAGE_KEY, STORAGE_VERSION, StorageSchema } from '../types/storage';

/**
 * LocalStorage 操作
 */

/**
 * 从 LocalStorage 加载数据
 */
export function loadRecords(): RelationRecord[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }

    const parsed: StorageSchema = JSON.parse(data);
    return parsed.records || [];
  } catch (error) {
    console.error('Failed to load records:', error);
    return [];
  }
}

/**
 * 保存数据到 LocalStorage
 */
export function saveRecords(records: RelationRecord[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const schema: StorageSchema = {
      version: STORAGE_VERSION,
      records,
      lastModified: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  } catch (error) {
    console.error('Failed to save records:', error);
  }
}

/**
 * 添加或更新记录
 */
export function upsertRecord(record: RelationRecord): RelationRecord[] {
  const records = loadRecords();
  const existingIndex = records.findIndex((r) => r.id === record.id);

  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    records.push(record);
  }

  saveRecords(records);
  return records;
}

/**
 * 删除记录
 */
export function deleteRecord(id: string): RelationRecord[] {
  const records = loadRecords();
  const filtered = records.filter((r) => r.id !== id);
  saveRecords(filtered);
  return filtered;
}

/**
 * 根据 ID 获取记录
 */
export function getRecordById(id: string): RelationRecord | undefined {
  const records = loadRecords();
  return records.find((r) => r.id === id);
}

/**
 * 生成 UUID
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * 获取记录总数
 */
export function getRecordCount(): number {
  const records = loadRecords();
  return records.length;
}

/**
 * 清空所有记录
 */
export function clearAllRecords(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * 导出数据为 JSON 字符串
 */
export function exportRecords(): string {
  const records = loadRecords();
  const schema: StorageSchema = {
    version: STORAGE_VERSION,
    records,
    lastModified: Date.now(),
  };
  return JSON.stringify(schema, null, 2);
}

/**
 * 从 JSON 字符串导入数据
 */
export function importRecords(jsonString: string): { success: boolean; count: number } {
  try {
    const schema: StorageSchema = JSON.parse(jsonString);
    if (!schema.records || !Array.isArray(schema.records)) {
      return { success: false, count: 0 };
    }

    // 合并现有记录和新记录（避免 ID 冲突）
    const existingRecords = loadRecords();
    const existingIds = new Set(existingRecords.map((r) => r.id));

    const newRecords = schema.records.filter((r) => !existingIds.has(r.id));
    const allRecords = [...existingRecords, ...newRecords];

    saveRecords(allRecords);
    return { success: true, count: newRecords.length };
  } catch (error) {
    console.error('Failed to import records:', error);
    return { success: false, count: 0 };
  }
}
