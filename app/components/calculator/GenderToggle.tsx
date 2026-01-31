import { Gender } from '@/app/types/relation';

interface GenderToggleProps {
  value: Gender;
  onChange: (value: Gender) => void;
}

export function GenderToggle({ value, onChange }: GenderToggleProps) {
  return (
    <div className="gender-toggle">
      <span className="gender-label">对方性别</span>
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${value === Gender.MALE ? 'active' : ''}`}
          onClick={() => onChange(Gender.MALE)}
        >
          <span className="gender-icon">👨</span>
          <span>男性</span>
        </button>
        <button
          className={`toggle-button ${value === Gender.FEMALE ? 'active' : ''}`}
          onClick={() => onChange(Gender.FEMALE)}
        >
          <span className="gender-icon">👩</span>
          <span>女性</span>
        </button>
      </div>
    </div>
  );
}
