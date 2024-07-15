import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { RoutePaths } from '../../../const/routes.const.ts';

const items = [
  { icon: 'icon icon-enter', title: 'Login', route: RoutePaths.LOGIN, count: 0 },
  { icon: 'icon icon-credit-card', title: 'Card', route: RoutePaths.CARD, count: 0 },
  { icon: 'icon icon-receipt', title: 'Identity', route: RoutePaths.IDENTITY, count: 0 },
  { icon: 'icon icon-book', title: 'Secure Note', route: RoutePaths.NOTE, count: 0 },
];

export const SidebarTypes = observer(() => {
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
