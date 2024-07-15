import { Button } from 'antd';

export const AppLogo = () => {
  return (
    <div className="app-logo">
      <div className="app-logo-image">
        <img src="/logo.png" alt="" />
      </div>

      <div className="app-logo-info">
        <div className="app-logo-info-title">uPass</div>
        <div className="app-logo-info-desc">Password Manager</div>
      </div>

      <div className="app-logo-menu">
        <Button type="text" icon={<i className="icon icon-more-alt-vertical" />} />
      </div>
    </div>
  );
};
