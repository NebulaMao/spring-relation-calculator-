import { BLOCK_OPTIONS } from '@/app/lib/block-calculator';
import { BlockItem } from '@/app/types/record';

interface BlockPaletteProps {
  onSelect: (block: BlockItem) => void;
}

export function BlockPalette({ onSelect }: BlockPaletteProps) {
  return (
    <div className="block-palette">
      <h3 className="palette-title">选择积木块</h3>
      <div className="block-grid">
        {BLOCK_OPTIONS.map((block) => (
          <button
            key={block.id}
            className="block-item"
            onClick={() => onSelect(block)}
          >
            <span className="block-emoji">
              {block.gender === 'male' ? '👨' : '👩'}
            </span>
            <span className="block-label">{block.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
