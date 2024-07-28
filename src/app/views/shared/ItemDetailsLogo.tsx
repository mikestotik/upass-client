import React from 'react';

interface ItemDetailsLogoProps {
  title: string;
  type: 'Login' | 'Card' | 'Identity' | 'Note';
}

export const ItemDetailsLogo = ({ title, type }: ItemDetailsLogoProps) => {
  return (
    <div className="details-logo">
      {/* <div className="details-logo-icon">
        <i className="icon icon-enter" />
      </div> */}
      <div className="details-logo-info">
        <div className="details-logo-info-title">
          <i className="icon icon-enter" />
          <span>{ title }</span>
        </div>
        <div className="details-logo-info-category">{ type }</div>
      </div>
    </div>
  );
};
