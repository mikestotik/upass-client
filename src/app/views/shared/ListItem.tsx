import cn from 'classnames';
import React from 'react';

interface ListItemProps {
  title: string;
  desc?: string;
  logo?: string;
  logoDefault: string;
  active?: boolean;
}

export const ListItem = ({ title, desc, logo, logoDefault, active }: ListItemProps) => {
  return (
    <div className={cn('list-item', { active })}>
      <div className="list-item-logo">{logo ? <img src={logo} alt="" /> : <i className={logoDefault} />}</div>
      <div className="list-item-info">
        <div className="list-item-info-title">{title}</div>
        <div className="list-item-info-desk">{desc}</div>
      </div>
    </div>
  );
};
