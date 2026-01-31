import { Generation } from '@/app/types/relation';
import { GENERATIONS_DATA } from '@/app/data/generations';

interface GenerationSelectProps {
  value: Generation | null;
  onChange: (value: Generation) => void;
  placeholder?: string;
}

export function GenerationSelect({
  value,
  onChange,
  placeholder = '选择辈份',
}: GenerationSelectProps) {
  const options = GENERATIONS_DATA.map((gen) => ({
    value: gen.value,
    label: gen.label,
  }));

  const selectedOption = GENERATIONS_DATA.find((g) => g.value === value);

  return (
    <select
      value={value ?? ''}
      onChange={(e) => {
        const val = parseInt(e.target.value);
        onChange(val as Generation);
      }}
      className="generation-select"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
