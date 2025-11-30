import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/auth/LoginPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { ROUTES } from "@/config/routes";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        {/* Protected routes with layout */}
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <MainLayout>
                <div>home page</div>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ROOM_DETAILS}
          element={
            <ProtectedRoute>
              <MainLayout>
                <div>ROOM_DETAILS</div>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ROOM_BOOKING}
          element={
            <ProtectedRoute>
              <MainLayout>
                <div>ROOM BOOKING</div>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ROOM_MANAGE}
          element={
            <ProtectedRoute>
              <MainLayout>
                <div>manage and control</div>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BOOKING}
          element={
            <ProtectedRoute>
              <MainLayout>
                <div>booking</div>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
