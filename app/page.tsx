'use client';

import { useState } from 'react';
import { Calculator } from '@/app/components/calculator/Calculator';
import { BlockBuilder } from '@/app/components/building/BlockBuilder';
import { Notebook } from '@/app/components/notebook/Notebook';
import '@/app/styles/spring-festival.css';

type Tab = 'calculator' | 'builder' | 'notebook';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');

  return (
    <div className="container">
      <header>
        <h1 className="app-title">春节辈份计算器</h1>
        <p className="app-subtitle">轻松搞定亲戚称呼，再也不怕叫错人！</p>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-button ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          计算器
        </button>
        <button
          className={`tab-button ${activeTab === 'builder' ? 'active' : ''}`}
          onClick={() => setActiveTab('builder')}
        >
          搭积木
        </button>
        <button
          className={`tab-button ${activeTab === 'notebook' ? 'active' : ''}`}
          onClick={() => setActiveTab('notebook')}
        >
          记事本
        </button>
      </nav>

      <main>
        {activeTab === 'calculator' && <Calculator />}
        {activeTab === 'builder' && <BlockBuilder />}
        {activeTab === 'notebook' && <Notebook />}
      </main>
    </div>
  );
}
