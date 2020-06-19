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

const horizontalLines = [50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800];
const verticalLines = reportsParsed.filter(r => r.drawverticalline).map(r => r.date);

const lastReport = reportsParsed[reportsParsed.length - 1];

if (!lastReport.drawverticalline) {
  verticalLines.push(lastReport.date);
}

interface PropTypes {
  bottom?: boolean;
  x: string;
  y: number;
  fill: string;
}

function CustomizedLabel(props: any) {
  console.log(props);
  const {
    viewBox: { x, y },
    date,
    value,
  } = props;

  return (
    <text x={x} y={y} fontSize={10} textAnchor="end">
      <tspan x={x} dy="-20" dx="0" fontSize=".75rem">
        {date}
      </tspan>
      <tspan x={x} dy="20" dx="0" fontSize="1rem">
        {value}
      </tspan>
    </text>
  );
}

//<text font-size=".75rem" x="406.28767123287673" y="261.145" class="recharts-text recharts-label" text-anchor="middle">
//  <tspan x="406.28767123287673" dy="0em">06/06</tspan>
//</text>

function RenderReference(props: PropTypes) {
  const { fill, x, y } = props;

  return (
    <ReferenceDot key={`${x}_${y}`} x={x} y={y} r={5} fill={fill} stroke="none">
      <Label position="insideBottomLeft" value={y} content={<CustomizedLabel date={x} />} />

      {/* <Label position="top" value={x} offset={25} fontSize=".75rem" /> */}
      {/* <Label position="top" value={y} offset={bottom ? -30 : 5} /> */}
    </ReferenceDot>
  );
}

const highlightAll = reportsParsed.filter(r => r.highlightnotifiedall);
const highlightConfirmed = reportsParsed.filter(r => r.highlightnotifiedconfirmed);

const referencesAll = highlightAll.map(r =>
  RenderReference({ bottom: false, x: r.date, y: r.notifiedall, fill: '#4A148C' }),
);
const referencesConfirmed = highlightConfirmed.map(r =>
  RenderReference({ x: r.date, y: r.notifiedconfirmed!, fill: '#004D40' }),
);

export function Chart() {
  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={reportsParsed}>
          <XAxis dataKey="date" ticks={verticalLines} />
          <YAxis ticks={horizontalLines} domain={[0, 'dataMax']} width={30} />
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
