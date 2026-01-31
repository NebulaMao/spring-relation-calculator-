'use client';

import { useState, useRef, useEffect } from 'react';

interface SaveModalProps {
  initialName: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export function SaveModal({ initialName, onSave, onCancel }: SaveModalProps) {
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">保存记录</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="给这条记录起个名字..."
            className="modal-input"
            maxLength={50}
          />
          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              取消
            </button>
            <button
              type="submit"
              className="confirm-button"
              disabled={!name.trim()}
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
