import React from 'react';

export function CustomLabel(props: any) {
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
