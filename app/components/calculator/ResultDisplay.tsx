import { CalculationResult } from '@/app/types/relation';

interface ResultDisplayProps {
  result: CalculationResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const { generationDiff, isElder, isSelf, title, description } = result;

  if (isSelf) {
    return (
      <div className="result-display self-result">
        <div className="result-icon">😊</div>
        <div className="result-title">{title}</div>
        <div className="result-description">这是你自己</div>
      </div>
    );
  }

  return (
    <div className={`result-display ${isElder ? 'elder-result' : 'younger-result'}`}>
      <div className="result-badge">
        {isElder ? '长辈' : '晚辈'}
      </div>
      <div className="result-main">
        <div className="result-title">{title}</div>
        <div className="result-description">{description}</div>
      </div>
      <div className="result-diff">
        代数差: {generationDiff > 0 ? '+' : ''}{generationDiff}
      </div>
    </div>
  );
}
