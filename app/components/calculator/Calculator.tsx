import { Generation, Gender } from '@/app/types/relation';
import { GenerationSelect } from './GenerationSelect';
import { GenderToggle } from './GenderToggle';
import { ResultDisplay } from './ResultDisplay';
import { calculateRelation } from '@/app/lib/calculator';
import { useState, useMemo } from 'react';

interface CalculatorProps {
  initialMyGen?: Generation;
  initialTheirGen?: Generation;
  initialGender?: Gender;
}

export function Calculator({
  initialMyGen = Generation.SELF,
  initialTheirGen = Generation.GRANDCHILD,
  initialGender = Gender.MALE,
}: CalculatorProps) {
  const [myGeneration, setMyGeneration] = useState<Generation>(initialMyGen);
  const [theirGeneration, setTheirGeneration] = useState<Generation>(initialTheirGen);
  const [gender, setGender] = useState<Gender>(initialGender);

  const result = useMemo(() => {
    return calculateRelation(myGeneration, theirGeneration, gender);
  }, [myGeneration, theirGeneration, gender]);

  const handleSwap = () => {
    setMyGeneration(theirGeneration);
    setTheirGeneration(myGeneration);
  };

  return (
    <div className="calculator-card">
      <h2 className="section-title">辈份计算器</h2>

      <div className="generation-row">
        <div className="generation-field">
          <label className="field-label">我的辈份</label>
          <GenerationSelect
            value={myGeneration}
            onChange={setMyGeneration}
            placeholder="选择你的辈份"
          />
        </div>

        <button onClick={handleSwap} className="swap-button" title="交换">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="24"
            height="24"
          >
            <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>

        <div className="generation-field">
          <label className="field-label">对方辈份</label>
          <GenerationSelect
            value={theirGeneration}
            onChange={setTheirGeneration}
            placeholder="选择对方辈份"
          />
        </div>
      </div>

      <GenderToggle value={gender} onChange={setGender} />

      <ResultDisplay result={result} />
    </div>
  );
}
