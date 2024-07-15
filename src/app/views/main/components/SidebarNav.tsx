import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { RoutePaths } from '../../../const/routes.const.ts';

const items = [
  { icon: 'icon icon-list', title: 'All Items', route: RoutePaths.ITEMS_ALL, count: 0 },
  { icon: 'icon icon-star', title: 'Favorites', route: RoutePaths.ITEMS_FAVORITES, count: 0 },
  { icon: 'icon icon-trash', title: 'Trash', route: RoutePaths.ITEMS_TRASH, count: 0 },
];

export const SidebarNav = observer(() => {
  return items.map((item) => (
    <NavLink key={item.title} to={item.route}>
      {({ isActive }) => (
        <div className={cn('nav-item', { active: isActive })}>
          <div className="nav-item-icon">
            <i className={item.icon} />
          </div>
          <div className="nav-item-title">{item.title}</div>

          {item.count ? <div className="nav-item-count">{item.count}</div> : null}
        </div>
      )}
    </NavLink>
  ));
});
