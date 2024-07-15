import { Button, Input } from 'antd';
import React, { ReactNode, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem } from './ListItem';

export interface ListItem {
  id: number;
  title: string;
  desc: string;
  logo?: string;
  defaultLogo: string;
}

interface AppPageProps {
  children: ReactNode;
  emptyList: ReactNode;
  items: ListItem[];
  onNewItem: () => void;
}

const { Search } = Input;

export const Content = ({ children, items, onNewItem, emptyList }: AppPageProps) => {
  const [search, setSearch] = useState<string>();

  const onSearch = useCallback((event: React.ChangeEvent) => {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }, []);

  return (
    <div className="content">
      <div className="content-list">
        <div className="content-list-head">
          <div className="content-list-head-search">
            <Input placeholder="Search.." autoFocus allowClear prefix={<i className="icon icon-search" />} onChange={onSearch} />
          </div>

          <div className="content-list-head-add">
            <Button icon={<i className="icon icon-plus" />} type="primary" block onClick={onNewItem} />
          </div>
        </div>

        <div className="content-list-items">
          {items?.length
            ? items.map((item, index) => (
                <NavLink key={index} to={String(item.id)}>
                  {({ isActive }) => (
                    <ListItem title={item.title} desc={item.desc} logo={item.logo} logoDefault={item.defaultLogo} active={isActive} />
                  )}
                </NavLink>
              ))
            : emptyList}
        </div>
      </div>

      <div className="content-details">{children}</div>
    </div>
  );
};
