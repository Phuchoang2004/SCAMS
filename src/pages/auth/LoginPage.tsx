import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials } from '@/types/auth';
import { ROUTES } from '@/config/routes';
import './auth.css';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoginLoading } = useAuth();
  const location = useLocation();
  const [form] = Form.useForm();

  // Redirect if already authenticated
  const from = location.state?.from?.pathname || ROUTES.HOME;
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const onFinish = async (values: LoginCredentials) => {
    try {
      await login(values);
      // Navigation is handled by the useAuth hook
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header-bar" />
      <div className="auth-content">
        <div className="auth-image-section">
          <img
            src="/hcmut-building.png"
            alt="HCMUT Building"
            className="auth-image"
            onError={(e) => {
              // Fallback 
                e.currentTarget.src = 'public/images/classroom.jpg';
            }}
          />
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            <Title level={2} className="auth-title">
              Sign in
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Smart Campus System - Make the university smart
            </Text>

            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              className="auth-form"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your HCMUT email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="input-icon" />}
                  placeholder="Enter your HCMUT email..."
                  size="large"
                  className="auth-input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="input-icon" />}
                  placeholder="Enter your password..."
                  size="large"
                  className="auth-input"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isLoginLoading}
                  className="auth-submit-btn"
                >
                  Sign in
                </Button>
              </Form.Item>

              <div className="auth-footer">
                <Text type="secondary">Don't have an account? </Text>
                <Link to={ROUTES.REGISTER}>Register now</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
