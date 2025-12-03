import React, { useState } from 'react';
import { Form, Input, Button, Typography, Select, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/config/routes';
import axios from 'axios';
import { env } from '@/config/env';
import './auth.css';

const { Title, Text } = Typography;
const { Option } = Select;

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Student' | 'Lecturer' | 'Security';
}

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const onFinish = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = values;
      await axios.post(`${env.API_BASE_URL}/auth/register`, registerData, {
        withCredentials: true,
      });
      message.success('Registration successful! Please login.');
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header-bar" />

      <div className="auth-content">
        <div className="auth-image-section">
          <img
            src="/hcmut-library.webp"
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
              Sign Up
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Smart Campus System - Make Our University Smart
            </Text>

            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              className="auth-form"
                          >
              <div style={{ display: 'flex', gap: '12px' }}>
                <Form.Item
                  name="firstName"
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: 'Please enter your first name' }]}
                >
                  <Input
                    prefix={<UserOutlined className="input-icon" />}
                    placeholder="First name..."
                    size="large"
                    className="auth-input"
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: 'Please enter your last name' }]}
                >
                  <Input
                    prefix={<UserOutlined className="input-icon" />}
                    placeholder="Last name..."
                    size="large"
                    className="auth-input"
                  />
                </Form.Item>
              </div>

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
                  { min: 6, message: 'Password must be at least 8 characters' },
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

              <Form.Item
                name="role"
                rules={[{ required: true, message: 'Please select your role' }]}
              >
                <Select
                  size="large"
                  placeholder="Select your role..."
                  style={{ width: '50%' }}
                >
                  <Option value="Student">Student</Option>
                  <Option value="Lecturer">Lecturer</Option>
                  <Option value="Security">Security</Option>
                </Select>
              </Form.Item>

              <Form.Item className="submit-btn-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isLoading}
                  className="auth-submit-btn"
                >
                  Sign Up
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
