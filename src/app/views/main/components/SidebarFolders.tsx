import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { RoutePaths } from '../../../const/routes.const.ts';

const items = [
  { icon: 'icon icon-folder', title: 'Home', route: RoutePaths.LOGIN_DETAILS.replace(':category', '1'), count: 0 },
  { icon: 'icon icon-folder', title: 'Work', route: RoutePaths.LOGIN_DETAILS.replace(':category', '2'), count: 0 },
  { icon: 'icon icon-folder', title: 'Shop', route: RoutePaths.LOGIN_DETAILS.replace(':category', '3'), count: 0 },
  { icon: 'icon icon-folder', title: 'Other', route: RoutePaths.LOGIN_DETAILS.replace(':category', '4'), count: 0 },
];

export const SidebarFolders = observer(() => {
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
