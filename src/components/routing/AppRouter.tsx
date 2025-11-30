import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/auth/LoginPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { ROUTES } from "@/config/routes";
import RoomDetails from "@/pages/room-details";
import RoomBooking from "@/pages/room-booking";
import RoomManage from "@/pages/room-manage";

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
                <RoomDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ROOM_BOOKING}
          element={
            <ProtectedRoute>
              <MainLayout>
                <RoomBooking />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ROOM_MANAGE}
          element={
            <ProtectedRoute>
              <MainLayout>
                <RoomManage />
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
