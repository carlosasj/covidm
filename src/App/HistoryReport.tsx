import React, { useState, useCallback } from 'react';
import { DailyReport } from './DailyReport';
import { reports } from '../data.json';

export function HistoryReport() {
  const maxIdx = reports.length - 1;
  const [idx, setIdx] = useState(maxIdx);
  const report = reports[idx];
  const hasNext = idx < maxIdx;
  const hasPrevious = 0 < idx;

  const handleClickNext = useCallback(() => {
    if (hasNext) {
      setIdx(i => i + 1);
    }
  }, [hasNext]);

  const handleClickPrevious = useCallback(() => {
    if (hasPrevious) {
      setIdx(i => i - 1);
    }
  }, [hasPrevious]);

  return (
    <DailyReport
      report={report}
      hasNext={hasNext}
      hasPrevious={hasPrevious}
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
    />
  );
}
