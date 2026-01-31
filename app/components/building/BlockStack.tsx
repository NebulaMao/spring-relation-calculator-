import { BlockItem, RelationNode } from '@/app/types/record';
import { getRelationDirection } from '@/app/lib/block-calculator';

interface BlockStackProps {
  nodes: RelationNode[];
  blocks: BlockItem[];
  onRemove: (index: number) => void;
  onClear: () => void;
}

export function BlockStack({ nodes, blocks, onRemove, onClear }: BlockStackProps) {
  if (blocks.length === 0) {
    return (
      <div className="block-stack empty">
        <div className="empty-message">
          <span className="empty-icon">🏗️</span>
          <p>还没有选择积木块</p>
          <p className="empty-hint">从上方选择积木块开始搭建</p>
        </div>
      </div>
    );
  }

  const diff = blocks.reduce((sum, b) => sum + b.generation, 0);
  const direction = getRelationDirection(diff);

  return (
    <div className="block-stack">
      <div className="stack-header">
        <h3 className="stack-title">积木链</h3>
        <button className="clear-button" onClick={onClear}>
          清空
        </button>
      </div>

      <div className="stack-chain">
        <div className="chain-node self-node">
          <span className="node-emoji">👤</span>
          <span className="node-label">自己</span>
        </div>

        {nodes.map((node, index) => (
          <div key={index} className="chain-segment">
            <div className="connector-line" />
            <button
              className="chain-node block-node"
              onClick={() => onRemove(index)}
              title="点击移除"
            >
              <span className="node-emoji">
                {node.gender === 'male' ? '👨' : '👩'}
              </span>
              <span className="node-label">{node.title}</span>
              <span className="remove-hint">×</span>
            </button>
          </div>
        ))}

        <div className="connector-line final-line" />
        <div className="chain-node result-node">
          <span className="node-emoji">🎯</span>
          <span className="node-label">{direction}</span>
        </div>
      </div>

      <div className="stack-summary">
        <span className="summary-text">
          共 {blocks.length} 步，最终辈份: {direction}
        </span>
      </div>
    </div>
  );
}
