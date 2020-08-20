import React from 'react';

import {
  MdCheck, MdErrorOutline, MdInfo, MdWarning, MdClose,
} from 'react-icons/md';

export interface SnackProps {
  type: 'info' | 'warn' | 'success' | 'error' | '';
  message: string;
  open: boolean;
  close: () => void;
}

const Snack: React.FC<SnackProps> = ({
  type = 'info', message, open, close,
}) => {
  const hidden = open ? 'show' : 'hide';
  const icon = (type === 'info' && (<MdInfo />))
                   || (type === 'warn' && (<MdWarning />))
                   || (type === 'success' && (<MdCheck />))
                   || (type === 'error' && (<MdErrorOutline />));

  const handleClose = () => {
    close();
  };

  return (
    <div className={`snack-container ${hidden}`}>
      <div className={`snack-box ${type}`}>
        <div className="snack-icon">
          {icon}
        </div>
        <div className="snack-message">
          <strong>{message}</strong>
        </div>
        <div
          className={`snack-close ${type}`}
          role="button"
          onClick={handleClose}
        >
          <MdClose />
        </div>
      </div>
    </div>
  );
};

export default Snack;