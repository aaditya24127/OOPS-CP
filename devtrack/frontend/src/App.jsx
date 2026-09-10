import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Code2, FolderGit2, Trophy, FileText, Briefcase, Settings, Plus, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Coding from './pages/Coding';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import ResumeBuilder from './pages/ResumeBuilder';
import Auth from './pages/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const Sidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Skills & Learning', path: '/skills', icon: <Code2 size={20} /> },
    { name: 'Coding Progress', path: '/coding', icon: <Code2 size={20} /> },
    { name: 'Projects', path: '/projects', icon: <FolderGit2 size={20} /> },
    { name: 'Certificates & Achievements', path: '/achievements', icon: <Trophy size={20} /> },
    { name: 'Resume & Portfolio', path: '/resume', icon: <FileText size={20} /> },
    { name: 'Placement Readiness', path: '/placement', icon: <Briefcase size={20} />, disabled: true },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="sidebar-header">
        DevTrack <span style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>.</span>
      </div>
      
      <ul className="nav-links" style={{ flex: 1, overflowY: 'auto' }}>
        {navItems.map((item) => (
          item.disabled ? (
            <li key={item.name} className="nav-item disabled" title="Coming Soon">
              {item.icon}
              <span>{item.name}</span>
            </li>
          ) : (
            <Link to={item.path} key={item.name} style={{textDecoration: 'none'}}>
              <li className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
                {item.icon}
                <span>{item.name}</span>
              </li>
            </Link>
          )
        ))}
      </ul>

      {/* User Profile Area (Bottom Left) */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', padding: '16px 0 0 0' }}>
        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' }} className="nav-item">
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
               {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
             </div>
             <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.user_metadata?.full_name || 'Student Developer'}
                </div>
                <div className="text-muted" style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user?.email || 'My Profile'}
                </div>
             </div>
          </div>
        </Link>
        <button onClick={handleSignOut} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.9rem', marginTop: '4px', borderRadius: '8px' }} className="nav-item">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
};

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-title">Student Developer Platform</div>
      <div className="user-profile-sm">
        <button className="btn btn-primary"><Plus size={16}/> Quick Add</button>
      </div>
    </div>
  );
};

// Layout wrapper for authenticated pages
const DashboardLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Topbar />
        <div className="content-area">
          <OutletWrapper />
        </div>
      </div>
    </div>
  );
};

// Small wrapper to export routes
const OutletWrapper = () => <Outlet />;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes wrapped in Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/coding" element={<Coding />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/resume" element={<ResumeBuilder />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
