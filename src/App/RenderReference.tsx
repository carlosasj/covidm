import React from 'react';
import { CustomLabel } from './CustomLabel';
import { ReferenceDot, Label } from 'recharts';

interface PropTypes {
  bottom?: boolean;
  x: string;
  y: number;
  fill: string;
}

export function RenderReference(props: PropTypes) {
  const { fill, x, y } = props;

  return (
    <ReferenceDot key={`${x}_${y}`} x={x} y={y} r={5} fill={fill} stroke="none">
      <Label position="insideBottomLeft" value={y} content={<CustomLabel date={x} />} />

      {/* <Label position="top" value={x} offset={25} fontSize=".75rem" /> */}
      {/* <Label position="top" value={y} offset={bottom ? -30 : 5} /> */}
    </ReferenceDot>
  );
}
