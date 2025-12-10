import React, { useEffect, useState, useRef } from 'react';
import { Typography, Button, Result, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { authService } from '@/services/auth';
import { ROUTES } from '@/config/routes';
import './auth.css';

const { Title, Text } = Typography;

type VerificationStatus = 'loading' | 'success' | 'error';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('');
  const hasVerified = useRef(false);

  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      // Prevent double call from React StrictMode
      if (hasVerified.current) {
        return;
      }
      hasVerified.current = true;

      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        const response = await authService.verifyEmail(token);
        setStatus('success');
        setMessage(response.message);
      } catch (error: any) {
        setStatus('error');
        const errorMessage =
          error.response?.data?.message ||
          'Email verification failed. Please try again or request a new verification link.';
        setMessage(errorMessage);
      }
    };

    verifyEmail();
  }, [token]);

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
              e.currentTarget.src = 'public/images/classroom.jpg';
            }}
          />
        </div>

        <div className="auth-form-section">
          <div className="auth-form-container" style={{ textAlign: 'center' }}>
            <Title level={2} className="auth-title">
              Email Verification
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Smart Campus System - Make Our University Smart
            </Text>

            {status === 'loading' && (
              <div style={{ padding: '60px 0' }}>
                <Spin size="large" />
                <p style={{ marginTop: 16, color: '#666' }}>
                  Verifying your email...
                </p>
              </div>
            )}

            {status === 'success' && (
              <Result
                icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                title="Email Verified!"
                subTitle={message}
                extra={
                  <Link to={ROUTES.LOGIN}>
                    <Button type="primary" size="large" className="auth-submit-btn">
                      Go to Login
                    </Button>
                  </Link>
                }
              />
            )}

            {status === 'error' && (
              <Result
                icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                title="Verification Failed"
                subTitle={message}
                extra={
                  <Link to={ROUTES.LOGIN}>
                    <Button type="primary" size="large" className="auth-submit-btn">
                      Go to Login
                    </Button>
                  </Link>
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
