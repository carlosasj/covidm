import React from 'react';
import './Header.scss';

export function Header() {
  return (
    <div className="jumbotron-fluid">
      <div className="container app-header">
        <h1 className="display-4">
          COVI<span>DM</span>
        </h1>
        <p className="lead">Visualização de dados da COVID 19 em Domingos Martins - ES</p>
      </div>
    </div>
  );
}
