import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { logout } from '../utils/auth';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const data = localStorage.getItem("user");
  const user = data ? JSON.parse(data) : {};
  const name = user?.name || "Student";
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  const navLinks = [
    { name: 'Dashboard', path: '/student' },
    { name: 'Attendance', path: '/student/attendance' },
    { name: 'Calendar', path: '/student/calendar' },
    { name: 'Chat', path: '/student/chat-groups' },
  ];
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-3">
          <Link to="/student" className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-[13px] font-bold text-white">
            {initials}
          </Link>
          <span className="text-white font-semibold hidden sm:block">Student</span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative group">
              <button className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200 ${['/student/semester-attendance', '/student/feedback', '/student/weekly-subject-feedback', '/student/apply-leave'].includes(location.pathname)
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}>
                More
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 mt-2 w-56 rounded-lg border border-neutral-800 bg-neutral-900 shadow-xl z-50">
                <div className="p-2">
                  <Link className={`w-full block text-left text-sm px-3 py-2 rounded-md transition-colors ${isActive('/student/semester-attendance') ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`} to="/student/semester-attendance">Semester Attendance</Link>
                  <Link className={`w-full block text-left text-sm px-3 py-2 rounded-md transition-colors ${isActive('/student/feedback') ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`} to="/student/feedback">Feedback</Link>
                  <Link className={`w-full block text-left text-sm px-3 py-2 rounded-md transition-colors ${isActive('/student/weekly-subject-feedback') ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`} to="/student/weekly-subject-feedback">Weekly Subject Feedback</Link>
                  <Link className={`w-full block text-left text-sm px-3 py-2 rounded-md transition-colors ${isActive('/student/apply-leave') ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`} to="/student/apply-leave">Apply Leave</Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Right Side: Profile & Settings */}
        <div className="flex items-center gap-3">
          <div className="relative group hidden md:block">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
              aria-label="Open settings" 
              className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 focus:outline-none"
            >
              <Settings className="w-5 h-5" />
            </button>
            <div className={`absolute right-0 mt-2 w-64 rounded-lg border border-neutral-800 bg-neutral-900 shadow-xl z-50 transition-all duration-150 ${isProfileOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
              <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
                <img alt="User profile" className="w-10 h-10 rounded-full object-cover" src={user.avatar || user.image || "https://avatars.githubusercontent.com/u/224962377?v=4&size=64"} />
                <div className="min-w-0">
                  <div className="text-white text-sm font-medium truncate">{name}</div>
                  <div className="text-neutral-500 text-xs truncate">{user.email}</div>
                </div>
              </div>
              <div className="p-2">
                <Link
                  className={`flex items-center gap-2 w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${isActive('/student/profile') ? 'bg-neutral-800 text-white' : 'text-neutral-200 hover:bg-neutral-800'}`}
                  to="/student/profile"
                >
                  <UserIcon className="w-4 h-4" />
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left text-sm px-3 py-2 rounded-md text-red-400 hover:bg-neutral-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-900 p-4 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path) ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-neutral-800">
            <Link 
              to="/student/profile" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-white font-medium uppercase"
            >
              <UserIcon className="w-5 h-5" />
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-red-500 font-medium uppercase"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
