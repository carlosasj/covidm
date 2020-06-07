import React from 'react';

interface PropTypes {
  className?: string;
  title: string;
  value?: number | string;
}

export function DataCard(props: PropTypes) {
  const { title, value = 0, className } = props;

  return (
    <div className={`card flat-shadow${className ? ` ${className}` : ''}`}>
      <div className="card-body text-center">
        <div className="data-value">{value}</div>
        <div className="data-title">{title}</div>
      </div>
    </div>
  );
}
