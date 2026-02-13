import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import UserLayout from './layouts/UserLayout';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import Partners from './pages/super-admin/Partners';
import CCAManagement from './pages/super-admin/CCA';
import UserManagement from './pages/super-admin/Users';
import Reservations from './pages/super-admin/Reservations';
import CommunityManagement from './pages/super-admin/Community';
import AdManagement from './pages/super-admin/Ads';
import SystemSettings from './pages/super-admin/Settings';
import Statistics from './pages/super-admin/Statistics';
import SystemMonitoring from './pages/super-admin/Monitoring';
import PartnerDashboard from './pages/partner/Dashboard';
import PartnerSettings from './pages/partner/Settings';
import PartnerReservations from './pages/partner/Reservations';
import PartnerCCAManagement from './pages/partner/CCAManagement';
import PartnerStatistics from './pages/partner/Statistics';
import PartnerAccount from './pages/partner/Account';
import CCAProfile from './pages/cca/Profile';
import CCASchedule from './pages/cca/Schedule';
import CCASettings from './pages/cca/Settings';
import CCAGallery from './pages/cca/Gallery';
import CCAStatistics from './pages/cca/Statistics';
import CCAAccount from './pages/cca/Account';
import UserHome from './pages/user/Home';
import UserPartnerList from './pages/user/PartnerList';
import UserPartnerDetail from './pages/user/PartnerDetail';
import UserCCAList from './pages/user/CCAList';
import UserCCAProfile from './pages/user/CCAProfile';
import UserReservationCreate from './pages/user/ReservationCreate';
import UserMyReservations from './pages/user/MyReservations';
import UserCommunityList from './pages/user/CommunityList';
import UserBoardDetail from './pages/user/BoardDetail';
import UserPostDetail from './pages/user/PostDetail';
import UserPostCreate from './pages/user/PostCreate';
import UserMyPage from './pages/user/MyPage';

function App() {
  // Mock auth state
  const auth: { isAuthenticated: boolean; role: 'super_admin' | 'partner_admin' | 'cca' | 'user'; userName: string } = {
    isAuthenticated: true,
    role: 'super_admin',
    userName: 'Super Admin'
  };

  return (
    <Router>
      <Routes>
        {/* Super Admin Routes */}
        <Route
          path="/super-admin/*"
          element={
            auth.role === 'super_admin' ? (
              <DashboardLayout role={auth.role} userName={auth.userName}>
                <Routes>
                  <Route path="dashboard" element={<SuperAdminDashboard />} />
                  <Route path="partners" element={<Partners />} />
                  <Route path="cca" element={<CCAManagement />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="reservations" element={<Reservations />} />
                  <Route path="community" element={<CommunityManagement />} />
                  <Route path="ads" element={<AdManagement />} />
                  <Route path="settings" element={<SystemSettings />} />
                  <Route path="stats" element={<Statistics />} />
                  <Route path="monitoring" element={<SystemMonitoring />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            ) : <Navigate to="/" replace />
          }
        />

        {/* Partner Admin Routes */}
        <Route
          path="/partner/*"
          element={
            auth.role === 'partner_admin' ? (
              <DashboardLayout role={auth.role} userName={auth.userName}>
                <Routes>
                  <Route path="dashboard" element={<PartnerDashboard />} />
                  <Route path="reservations" element={<PartnerReservations />} />
                  <Route path="cca" element={<PartnerCCAManagement />} />
                  <Route path="stats" element={<PartnerStatistics />} />
                  <Route path="settings" element={<PartnerSettings />} />
                  <Route path="account" element={<PartnerAccount />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            ) : <Navigate to="/" replace />
          }
        />

        {/* CCA Routes */}
        <Route
          path="/cca/*"
          element={
            auth.role === 'cca' ? (
              <DashboardLayout role={auth.role} userName={auth.userName}>
                <Routes>
                  <Route path="dashboard" element={<CCAProfile />} />
                  <Route path="gallery" element={<CCAGallery />} />
                  <Route path="stats" element={<CCAStatistics />} />
                  <Route path="schedule" element={<CCASchedule />} />
                  <Route path="settings" element={<CCASettings />} />
                  <Route path="account" element={<CCAAccount />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            ) : <Navigate to="/" replace />
          }
        />

        {/* Public / User Routes */}
        <Route
          path="/*"
          element={
            <UserLayout isAuthenticated={auth.isAuthenticated} userName={auth.userName} role={auth.role}>
              <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/partners" element={<UserPartnerList />} />
                <Route path="/partners/:id" element={<UserPartnerDetail />} />
                <Route path="/cca-list" element={<UserCCAList />} />
                <Route path="/cca/:id" element={<UserCCAProfile />} />
                <Route path="/reservations/new" element={<UserReservationCreate />} />
                <Route path="/my/reservations" element={<UserMyReservations />} />
                <Route path="/community" element={<UserCommunityList />} />
                <Route path="/community/board/:id" element={<UserBoardDetail />} />
                <Route path="/community/post/:id" element={<UserPostDetail />} />
                <Route path="/community/write" element={<UserPostCreate />} />
                <Route path="/my/settings" element={<UserMyPage />} />
                {/* Fallback to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </UserLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
