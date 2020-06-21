import React, { useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, Bar } from 'recharts';
import { reports } from '../data.json';
import { isoDateToShort } from '../modules/formatters';
import { useToggleCheckbox } from '../modules/hooks';
import { RenderReference } from './RenderReference';
import { maxOf, nextMultipleOf, range } from '../modules/utils';

const reportsParsed = reports.map(r => ({
  ...r,
  date: isoDateToShort(r.date),
}));

const lastReport = reportsParsed[reportsParsed.length - 1];

const {
  notifiedall: maxOfNotifiedAll,
  notifiedconfirmed: maxOfNotifiedConfirmed,
  confirmedhospital: maxOfConfirmedHospital,
  confirmedisolation: maxOfConfirmedIsolation,
  confirmeddead: maxOfConfirmedDead,
} = maxOf(reportsParsed, [
  'notifiedall',
  'notifiedconfirmed',
  'confirmedhospital',
  'confirmedisolation',
  'confirmeddead',
]);

const nextMultipleOfNotifiedAll = nextMultipleOf(100, maxOfNotifiedAll);
const nextMultipleOfNotifiedConfirmed = nextMultipleOf(50, maxOfNotifiedConfirmed);
const nextMultipleOfOthers = nextMultipleOf(
  50,
  Math.max(maxOfConfirmedHospital, maxOfConfirmedIsolation, maxOfConfirmedDead),
);
// const nextMultipleOfConfirmedHospital = nextMultipleOf(50, maxOfConfirmedHospital);
// const nextMultipleOfConfirmedIsolation = nextMultipleOf(50, maxOfConfirmedIsolation);
// const nextMultipleOfConfirmedDead = nextMultipleOf(50, maxOfConfirmedDead);

const verticalLines = reportsParsed.filter(r => r.drawverticalline).map(r => r.date);
// const horizontalLines = [50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800];

if (!lastReport.drawverticalline) {
  verticalLines.push(lastReport.date);
}

const referencesAll = reportsParsed
  .filter(r => r.highlightnotifiedall)
  .map(r => RenderReference({ bottom: false, x: r.date, y: r.notifiedall, fill: '#4A148C' }));

const referencesConfirmed = reportsParsed
  .filter(r => r.highlightnotifiedconfirmed)
  .map(r => RenderReference({ x: r.date, y: r.notifiedconfirmed!, fill: '#004D40' }));

// graph-red: #D30808
// graph-orange: #FB8C00
// graph-teal: #009688
// graph-purple: #673AB7
// graph-black: #000

export function Chart() {
  const [showNotifiedAll, toggleNotifiedAll] = useToggleCheckbox(true);
  const [showNotifiedConfirmed, toggleNotifiedConfirmed] = useToggleCheckbox(true);
  const [showConfirmedHospital, toggleConfirmedHospital] = useToggleCheckbox(true);
  const [showConfirmedIsolation, toggleConfirmedIsolation] = useToggleCheckbox(true);
  const [showConfirmedDead, toggleConfirmedDead] = useToggleCheckbox(true);

  const graphMax = useMemo(() => {
    if (showNotifiedAll) {
      return nextMultipleOfNotifiedAll;
    }

    if (showNotifiedConfirmed) {
      return nextMultipleOfNotifiedConfirmed;
    }

    return nextMultipleOfOthers;
  }, [showNotifiedAll, showNotifiedConfirmed]);

  const horizontalLines = useMemo(() => {
    const lines: number[] = [];
    if (showNotifiedAll) {
      lines.push(...range(0, nextMultipleOfNotifiedAll + 1, 100));
    }

    if (showNotifiedConfirmed) {
      lines.push(...range(0, nextMultipleOfNotifiedConfirmed + 1, 50));
    }

    if (!showNotifiedAll) {
      lines.push(...range(0, nextMultipleOfOthers + 1, 10));
    }
    return Array.from(new Set(lines)).sort((a, b) => a - b);
  }, [showNotifiedAll, showNotifiedConfirmed]);

  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-between flex-wrap">
        <div className="btn-group-toggle btn-group mb-2" data-toggle="buttons">
          <label className={`btn btn-outline-graph-purple ${showNotifiedAll ? 'active' : ''}`}>
            <input type="checkbox" checked={showNotifiedAll} onChange={toggleNotifiedAll} /> Notificados
          </label>
          <label className={`btn btn-outline-graph-teal ${showNotifiedConfirmed ? 'active' : ''}`}>
            <input type="checkbox" checked={showNotifiedConfirmed} onChange={toggleNotifiedConfirmed} /> Confirmados
          </label>
          <label className={`btn btn-outline-graph-black ${showConfirmedDead ? 'active' : ''}`}>
            <input type="checkbox" checked={showConfirmedDead} onChange={toggleConfirmedDead} /> Óbitos
          </label>
        </div>
        <div className="btn-group-toggle btn-group mb-2" data-toggle="buttons">
          <label className={`btn btn-outline-graph-orange ${showConfirmedIsolation ? 'active' : ''}`}>
            <input type="checkbox" checked={showConfirmedIsolation} onChange={toggleConfirmedIsolation} /> Em Isolamento
          </label>
          <label className={`btn btn-outline-graph-red ${showConfirmedHospital ? 'active' : ''}`}>
            <input type="checkbox" checked={showConfirmedHospital} onChange={toggleConfirmedHospital} /> Hospitalizados
          </label>
        </div>
      </div>
      <div className="col-12">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={reportsParsed}>
              <XAxis dataKey="date" ticks={verticalLines} />
              <YAxis ticks={horizontalLines} domain={[0, graphMax]} width={30} />
              <Legend />
              <CartesianGrid strokeDasharray="5" stroke="rgba(0, 0, 0, .2)" />
              {showConfirmedHospital && (
                <Bar
                  dataKey="confirmedhospital"
                  stackId="confirmed"
                  barSize={20}
                  fill="#D30808"
                  name="Hospitalizados"
                  isAnimationActive={false}
                />
              )}
              {showConfirmedIsolation && (
                <Bar
                  dataKey="confirmedisolation"
                  stackId="confirmed"
                  barSize={20}
                  fill="#FB8C00"
                  name="Isolamento Domiciliar"
                  isAnimationActive={false}
                />
              )}
              <Tooltip animationDuration={280} />
              {showNotifiedConfirmed && (
                <Line
                  type="monotone"
                  dataKey="notifiedconfirmed"
                  strokeWidth={2}
                  stroke="#009688"
                  name="Confirmados"
                  dot={false}
                  isAnimationActive={false}
                />
              )}
              {showNotifiedAll && (
                <Line
                  type="monotone"
                  dataKey="notifiedall"
                  strokeWidth={2}
                  stroke="#673AB7"
                  name="Notificados"
                  dot={false}
                  isAnimationActive={false}
                />
              )}
              {showConfirmedDead && (
                <Line
                  type="monotone"
                  dataKey="confirmeddead"
                  strokeWidth={2}
                  stroke="#000"
                  name="Óbitos"
                  dot={false}
                  isAnimationActive={false}
                />
              )}
              {showNotifiedAll && referencesAll}
              {showNotifiedConfirmed && referencesConfirmed}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
