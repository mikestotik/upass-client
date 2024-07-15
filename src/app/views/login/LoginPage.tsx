import { Button, Empty } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { NavLink, Outlet, useMatch, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../const/routes.const.ts';
import { useStore } from '../../hooks/useStore.hook.ts';
import { Login } from '../../models/login/login.interface.ts';
import { Content, ListItem } from '../shared/Content.tsx';

export const LoginPage = observer(() => {
  const navigate = useNavigate();
  const isRootPath = useMatch(RoutePaths.LOGIN);

  const { loginStore } = useStore();

  const emptyList = (
    <Empty className="empty" description="No one login saved">
      <NavLink to={RoutePaths.LOGIN_NEW}>
        <Button icon={<i className="icon icon-plus" />}>Add Login</Button>
      </NavLink>
    </Empty>
  );

  const emptyDetails = <Empty className="empty" description="Select a login from list" image={false} />;

  return (
    <Content
      items={loginStore.logins.map((item) => mapLoginToListItem(item))}
      onNewItem={() => navigate(RoutePaths.LOGIN_NEW)}
      emptyList={emptyList}
    >
      {isRootPath ? emptyDetails : <Outlet />}
    </Content>
  );
});

function mapLoginToListItem(login: Login): ListItem {
  return {
    id: login.id,
    title: login.title,
    logo: login.logo,
    desc: login.username || dayjs(login.created).format('DD.MM.YYYY HH:mm'),
    defaultLogo: 'icon icon-enter',
  };
}
