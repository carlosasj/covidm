import React from 'react';
import { Report } from '../types/report';
import { DataCard } from './DataCard';
import { isoDateToHuman } from '../modules/formatters';
import linkThin from '../assets/link-thin.svg';

interface PropTypes {
  report: Report;
  hasPrevious?: boolean;
  hasNext?: boolean;
  onClickPrevious?: () => void;
  onClickNext?: () => void;
}

export function DailyReport(props: PropTypes) {
  const {
    report: {
      source,
      date,
      notifiedall,
      notifiedconfirmed,
      notifiedsuspicious,
      notifieddiscarded,
      confirmedisolation,
      confirmedhospital,
      confirmedcured,
      confirmeddead,
      comments,
    },
    hasPrevious = true,
    hasNext = true,
    onClickPrevious = () => {
      console.log('onClickPrevious');
    },
    onClickNext = () => {
      console.log('onClickNext');
    },
  } = props;

  const formattedDate = isoDateToHuman(date);

  return (
    <div className="container-fluid report-container ">
      <div className="row no-gutters mb-3">
        {onClickPrevious && (
          <div onClick={onClickPrevious} className="col-2 d-flex">
            {hasPrevious && <button className="btn report-control btn-block text-left">&lt;</button>}
          </div>
        )}
        <div className="col text-center">
          <h3 className="mb-0">Boletim do dia {formattedDate}</h3>
        </div>
        {onClickNext && (
          <div onClick={onClickNext} className="col-2 d-flex">
            {hasNext && <button className="btn report-control btn-block text-right">&gt;</button>}
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-12 mb-3">
          <DataCard title="Casos notificados" value={notifiedall} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 d-flex flex-column mb-3 mb-md-0">
          <div className="row">
            <div className="col-12 mb-2">
              <div className="card flat-shadow">
                <div className="card-body text-center">
                  <span aria-hidden="true">📝</span> Dentre os casos notificados:
                </div>
              </div>
            </div>
          </div>
          <div className="row sm-gutters flex-fill">
            <div className="col d-flex flex-column">
              <DataCard className="flex-fill" title="Confirmados" value={notifiedconfirmed} />
            </div>
            <div className="col d-flex flex-column">
              <DataCard className="flex-fill" title="Suspeitos" value={notifiedsuspicious} />
            </div>
            <div className="col d-flex flex-column">
              <DataCard className="flex-fill" title="Descartados" value={notifieddiscarded} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex flex-column mb-2 mb-md-0">
          <div className="row">
            <div className="col-12 mb-2">
              <div className="card flat-shadow">
                <div className="card-body text-center">
                  <span aria-hidden="true">✅</span> Dentre os casos confirmados:
                </div>
              </div>
            </div>
          </div>
          <div className="row sm-gutters flex-fill">
            <div className="col d-flex flex-column">
              <DataCard className="flex-fill" title="Isolamento Domiciliar" value={confirmedisolation} />
            </div>
            <div className="col d-flex flex-column">
              <DataCard className="flex-fill" title="Hospitalizados" value={confirmedhospital} />
            </div>
            <div className="col d-flex flex-column">
              <DataCard className="flex-fill" title="Curados" value={confirmedcured} />
            </div>
            {confirmeddead && (
              <div className="col d-flex flex-column">
                <DataCard className="flex-fill" title="Óbitos" value={confirmeddead} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        {comments && <div className="col">{comments}</div>}
        <div className="col-12 text-right">
          <a href={source} target="_blank" rel="noopener noreferrer" className="font-weight-light small">
            fonte <img width="12px" src={linkThin} alt="ícone de link externo" />
          </a>
        </div>
      </div>
    </div>
  );
}
