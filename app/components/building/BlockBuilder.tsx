import { BlockItem } from '@/app/types/record';
import { BlockPalette } from './BlockPalette';
import { BlockStack } from './BlockStack';
import { calculateBlockChain } from '@/app/lib/block-calculator';
import { useState, useMemo } from 'react';

interface BlockBuilderProps {
  initialBlocks?: BlockItem[];
}

export function BlockBuilder({ initialBlocks = [] }: BlockBuilderProps) {
  const [blocks, setBlocks] = useState<BlockItem[]>(initialBlocks);

  const result = useMemo(() => {
    return calculateBlockChain(blocks);
  }, [blocks]);

  const handleSelect = (block: BlockItem) => {
    setBlocks([...blocks, block]);
  };

  const handleRemove = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setBlocks([]);
  };

  return (
    <div className="builder-card">
      <h2 className="section-title">搭积木</h2>
      <p className="section-description">
        通过选择积木块构建关系链，从"自己"出发，看看能走到哪里
      </p>

      <BlockPalette onSelect={handleSelect} />

      <BlockStack
        nodes={result.nodes}
        blocks={blocks}
        onRemove={handleRemove}
        onClear={handleClear}
      />

      {blocks.length > 0 && (
        <div className="builder-result">
          <div className="result-label">最终称呼</div>
          <div className="result-value">{result.finalTitle}</div>
        </div>
      )}
    </div>
  );
}
