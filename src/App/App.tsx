import React from 'react';
import { Header } from './Header';
import { HistoryReport } from './HistoryReport';
import { Chart } from './Chart';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container-fluid">
        <Chart />
        <HistoryReport />
      </div>
    </div>
  );
}

export default App;
