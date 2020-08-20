import React from 'react';

import {
  MdCheck, MdErrorOutline, MdInfo, MdWarning, MdClose,
} from 'react-icons/md';

export interface AlertBoxProps {
  type: 'info' | 'warn' | 'success' | 'error' | '';
  title: string;
  message: string;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const AlertBox: React.FC<AlertBoxProps> = ({ 
  type, title, message, open, onConfirm, onClose
}) => {
  const hidden = open ? 'show' : 'hide';
  const icon = (type === 'info' && (<MdInfo />))
                   || (type === 'warn' && (<MdWarning />))
                   || (type === 'success' && (<MdCheck />))
                   || (type === 'error' && (<MdErrorOutline />));

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  function handleClose() {
    onClose();
  };

  return (
    <div className={`alert-container ${hidden}`}>
      <div className={`alert-box`}>
        <div className="title-container">
          <strong>{title}</strong>
          <div
            className={`alert-close`}
            role="button"
            onClick={handleClose}
          >
            <MdClose />
          </div>
        </div>

        <div className="message-container">
          <div className={`alert-icon ${type}`}>
            {icon}
          </div>
          <div className="alert-message">
            <strong>{message}</strong>
          </div>
        </div>

        <div className='buttons-container'>
          <button 
            onClick={handleClose}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="button-confirm"
            onClick={handleConfirm}
            type="button"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;