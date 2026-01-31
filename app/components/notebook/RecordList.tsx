import { RelationRecord } from '@/app/types/record';
import { GENERATIONS_DATA, getTitleByDiff } from '@/app/data/generations';

interface RecordListProps {
  records: RelationRecord[];
  onLoad: (record: RelationRecord) => void;
  onEdit: (record: RelationRecord) => void;
  onDelete: (id: string) => void;
}

export function RecordList({
  records,
  onLoad,
  onEdit,
  onDelete,
}: RecordListProps) {
  if (records.length === 0) {
    return (
      <div className="record-list empty">
        <div className="empty-message">
          <span className="empty-icon">📝</span>
          <p>还没有保存的记录</p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getGenerationLabel = (value: number) => {
    const info = GENERATIONS_DATA.find((g) => g.value === value);
    return info?.label || `第 ${value} 辈`;
  };

  return (
    <div className="record-list">
      {records.map((record) => {
        const diff = record.theirGeneration - record.myGeneration;
        const title = getTitleByDiff(diff, record.gender);

        return (
          <div key={record.id} className="record-item">
            <div className="record-info">
              <div className="record-name">{record.name}</div>
              <div className="record-meta">
                {getGenerationLabel(record.myGeneration)} → {title}
              </div>
              <div className="record-date">
                更新于 {formatDate(record.updatedAt)}
              </div>
            </div>
            <div className="record-actions">
              <button
                className="action-button load"
                onClick={() => onLoad(record)}
                title="加载"
              >
                📥
              </button>
              <button
                className="action-button edit"
                onClick={() => onEdit(record)}
                title="编辑"
              >
                ✏️
              </button>
              <button
                className="action-button delete"
                onClick={() => onDelete(record.id)}
                title="删除"
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
