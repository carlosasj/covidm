import React from 'react';
import ReactGA from 'react-ga';
import { Header } from './Header';
import { HistoryReport } from './HistoryReport';
import { Chart } from './Chart';

const trackingId = 'UA-168690601-1';
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="container-fluid px-0 px-sm-3">
        <Chart />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="s12 py-4"></div>
        </div>
        <HistoryReport />
      </div>
    </div>
  );
}
