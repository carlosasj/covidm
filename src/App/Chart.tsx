import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  Bar,
  ReferenceDot,
  Label,
} from 'recharts';
import { reports } from '../data.json';
import { isoDateToShort } from '../modules/formatters';

const reportsParsed = reports.map(r => ({
  ...r,
  date: isoDateToShort(r.date),
}));

const horizontalLines = [50, 100, 150, 200, 300, 400, 500, 600];
const verticalLines = reportsParsed.filter(r => r.drawverticalline).map(r => r.date);

const lastReport = reportsParsed[reportsParsed.length - 1];

if (!lastReport.drawverticalline) {
  verticalLines.push(lastReport.date);
}

interface PropTypes {
  x: string;
  y: number;
  fill: string;
}

function RenderReference(props: PropTypes) {
  const { fill, x, y } = props;

  return (
    <ReferenceDot key={`${x}_${y}`} x={x} y={y} r={5} fill={fill} stroke="none">
      <Label position="top" value={x} fontSize=".75rem" offset={25} />
      <Label position="top" value={y} />
    </ReferenceDot>
  );
}

const highlightAll = reportsParsed.filter(r => r.highlightnotifiedall);
const highlightConfirmed = reportsParsed.filter(r => r.highlightnotifiedconfirmed);

const referencesAll = highlightAll.map(r => RenderReference({ x: r.date, y: r.notifiedall, fill: '#4A148C' }));
const referencesConfirmed = highlightConfirmed.map(r =>
  RenderReference({ x: r.date, y: r.notifiedconfirmed!, fill: '#004D40' }),
);

export function Chart() {
  return (
    <div style={{ height: 'calc(100vh - 121px)' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={730} height={250} data={reportsParsed}>
          <XAxis dataKey="date" ticks={verticalLines} />
          <YAxis ticks={horizontalLines} />
          <Legend />
          <CartesianGrid strokeDasharray="5" stroke="rgba(0, 0, 0, .2)" />
          <Bar dataKey="confirmedhospital" stackId="confirmed" barSize={20} fill="#D30808" name="Hospitalizados" />
          <Bar
            dataKey="confirmedisolation"
            stackId="confirmed"
            barSize={20}
            fill="#FB8C00"
            name="Isolamento Domiciliar"
          />
          <Tooltip animationDuration={280} />
          <Line
            type="monotone"
            dataKey="notifiedconfirmed"
            strokeWidth={2}
            stroke="#009688"
            name="Confirmados"
            dot={false}
          />
          <Line type="monotone" dataKey="notifiedall" strokeWidth={2} stroke="#673AB7" name="Notificados" dot={false} />
          <Line type="monotone" dataKey="confirmeddead" strokeWidth={2} stroke="#000" name="Óbitos" dot={false} />
          {referencesAll}
          {referencesConfirmed}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
