import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import './auth.css';

const { Title, Text } = Typography;

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [form] = Form.useForm();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const onFinish = async (values: RegisterFormValues) => {
    console.log('Register values:', values);
    // TODO: Implement registration logic
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
              e.currentTarget.src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80';
            }}
          />
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container">
            <Title level={2} className="auth-title">
              Sign up
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Smart Campus System - Make the university smart
            </Text>

            <Form
              form={form}
              name="register"
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
                  {
                    pattern: /@hcmut\.edu\.vn$/,
                    message: 'Please use your HCMUT email',
                  },
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
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 8, message: 'Password must be at least 8 characters' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="input-icon" />}
                  placeholder="Enter your password..."
                  size="large"
                  className="auth-input"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="input-icon" />}
                  placeholder="Confirm your password..."
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
                  className="auth-submit-btn"
                >
                  Sign up
                </Button>
              </Form.Item>
            </Form>

            <div className="auth-footer">
              <Text type="secondary">Already have an account? </Text>
              <Link to={ROUTES.LOGIN}>Sign in now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
