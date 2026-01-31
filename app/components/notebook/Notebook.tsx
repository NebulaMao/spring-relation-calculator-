'use client';

import { RecordList } from './RecordList';
import { SaveModal } from './SaveModal';
import { useState, useEffect } from 'react';
import { RelationRecord } from '@/app/types/record';
import { Generation, Gender } from '@/app/types/relation';
import { loadRecords, upsertRecord, deleteRecord, generateId } from '@/app/lib/storage';
import { calculateRelation } from '@/app/lib/calculator';

interface NotebookProps {
  initialMyGen?: Generation;
  initialTheirGen?: Generation;
  initialGender?: Gender;
}

export function Notebook({
  initialMyGen = Generation.SELF,
  initialTheirGen = Generation.GRANDCHILD,
  initialGender = Gender.MALE,
}: NotebookProps) {
  const [records, setRecords] = useState<RelationRecord[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RelationRecord | null>(null);

  const [myGen, setMyGen] = useState<Generation>(initialMyGen);
  const [theirGen, setTheirGen] = useState<Generation>(initialTheirGen);
  const [gender, setGender] = useState<Gender>(initialGender);

  useEffect(() => {
    setRecords(loadRecords());
  }, []);

  const currentResult = calculateRelation(myGen, theirGen, gender);

  const handleSave = (name: string) => {
    const record: RelationRecord = {
      id: editingRecord?.id || generateId(),
      name,
      myGeneration: myGen,
      theirGeneration: theirGen,
      gender,
      createdAt: editingRecord?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    upsertRecord(record);
    setRecords(loadRecords());
    setShowSaveModal(false);
    setEditingRecord(null);
  };

  const handleEdit = (record: RelationRecord) => {
    setEditingRecord(record);
    setMyGen(record.myGeneration);
    setTheirGen(record.theirGeneration);
    setGender(record.gender);
    setShowSaveModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条记录吗？')) {
      deleteRecord(id);
      setRecords(loadRecords());
    }
  };

  const handleLoad = (record: RelationRecord) => {
    setMyGen(record.myGeneration);
    setTheirGen(record.theirGeneration);
    setGender(record.gender);
  };

  const handleNew = () => {
    setEditingRecord(null);
    setMyGen(Generation.SELF);
    setTheirGen(Generation.GRANDCHILD);
    setGender(Gender.MALE);
  };

  return (
    <div className="notebook-card">
      <div className="notebook-header">
        <h2 className="section-title">备份记事本</h2>
        <div className="notebook-actions">
          <button className="new-button" onClick={handleNew}>
            新建
          </button>
          <button
            className="save-button"
            onClick={() => setShowSaveModal(true)}
          >
            保存当前
          </button>
        </div>
      </div>

      <RecordList
        records={records}
        onLoad={handleLoad}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showSaveModal && (
        <SaveModal
          initialName={editingRecord?.name || ''}
          onSave={handleSave}
          onCancel={() => {
            setShowSaveModal(false);
            setEditingRecord(null);
          }}
        />
      )}
    </div>
  );
}
