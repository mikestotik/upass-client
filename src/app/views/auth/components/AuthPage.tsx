import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

interface AuthPageProps {
  desc: string;
  children: ReactNode;
}

export const AuthPage = observer(({ children, desc }: AuthPageProps) => {
  return (
    <div className="auth">
      <div className="auth-title">
        <div className="auth-title-logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="auth-title-text">uPass</div>
      </div>
      <div className="auth-desc">{desc}</div>
      <div className="auth-content">{children}</div>
      <div className="auth-footer">
        <span>By signing up, you acknowledge that you have read and understood, and agree to Assistants AI </span>
        <Button type="link" href="" target="_blank" style={{ padding: 0, height: 22 }}>
          Terms of Service
        </Button>
        <span> and </span>
        <Button type="link" href="" target="_blank" style={{ padding: 0, height: 22 }}>
          Privacy Policy
        </Button>
        .
      </div>
    </div>
  );
});
