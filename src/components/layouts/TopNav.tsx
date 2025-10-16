import React from 'react';
import { Button, Dropdown, Avatar, Badge } from 'antd';
import type { MenuProps } from 'antd';
import { 
  FiMaximize, 
  FiSun, 
  FiMoon, 
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown
} from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { GiPayMoney } from 'react-icons/gi';
import { LuListTodo } from 'react-icons/lu';
import { ImBlog } from 'react-icons/im';
import { PiNotebookLight } from 'react-icons/pi';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SlEvent } from 'react-icons/sl';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { changeTheme } from '@/redux/features/themeSlice';
import { userRoleFormate } from '@/constant/userRole';
import useLogout from '@/hooks/useLogout';

const TopNav: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const logOut = useLogout();
  const { isDark } = useAppSelector((state) => state.theme);
  const { user } = useAppSelector((state) => state.auth);

  // Navigation items organized by category
  const managementItems: MenuProps['items'] = [
    {
      key: '/todo',
      label: (
        <Link to="/todo" className="flex items-center gap-3 py-2">
          <LuListTodo className="text-lg" />
          <span>Todo Management</span>
        </Link>
      ),
    },
    {
      key: '/transaction',
      label: (
        <Link to="/transaction" className="flex items-center gap-3 py-2">
          <GiPayMoney className="text-lg" />
          <span>Transactions</span>
        </Link>
      ),
    },
    {
      key: '/password-manager',
      label: (
        <Link to="/password-manager" className="flex items-center gap-3 py-2">
          <RiLockPasswordLine className="text-lg" />
          <span>Password Manager</span>
        </Link>
      ),
    },
  ];

  const contentItems: MenuProps['items'] = [
    {
      key: '/blog',
      label: (
        <Link to="/blog" className="flex items-center gap-3 py-2">
          <ImBlog className="text-lg" />
          <span>Blog</span>
        </Link>
      ),
    },
    {
      key: '/diary',
      label: (
        <Link to="/diary" className="flex items-center gap-3 py-2">
          <PiNotebookLight className="text-lg" />
          <span>Personal Diary</span>
        </Link>
      ),
    },
    {
      key: '/contact',
      label: (
        <Link to="/contact" className="flex items-center gap-3 py-2">
          <MdOutlineConnectWithoutContact className="text-lg" />
          <span>Contacts</span>
        </Link>
      ),
    },
    {
      key: '/event',
      label: (
        <Link to="/event" className="flex items-center gap-3 py-2">
          <SlEvent className="text-lg" />
          <span>Events</span>
        </Link>
      ),
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Link to="/profile" className="flex items-center gap-3 py-2">
          <FiUser className="text-lg" />
          <span>Profile</span>
        </Link>
      ),
    },
    {
      key: 'settings',
      label: (
        <Link to="/settings" className="flex items-center gap-3 py-2">
          <FiSettings className="text-lg" />
          <span>Settings</span>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <div onClick={logOut} className="flex items-center gap-3 py-2 text-red-600">
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </div>
      ),
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src="/photos/logo.webp" alt="Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-gray-900">Personal Assistant</span>
            </Link>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Home */}
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <GoHome className="text-lg" />
                <span>Dashboard</span>
              </Link>

              {/* Management Dropdown */}
              <Dropdown 
                menu={{ items: managementItems }} 
                placement="bottomLeft"
                trigger={['hover']}
              >
                <Button
                  type="text"
                  className={`flex items-center gap-2 px-4 py-2 h-10 rounded-lg transition-all duration-200 ${
                    ['/todo', '/transaction', '/password-manager'].includes(location.pathname)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>Management</span>
                  <FiChevronDown className="text-sm" />
                </Button>
              </Dropdown>

              {/* Content Dropdown */}
              <Dropdown 
                menu={{ items: contentItems }} 
                placement="bottomLeft"
                trigger={['hover']}
              >
                <Button
                  type="text"
                  className={`flex items-center gap-2 px-4 py-2 h-10 rounded-lg transition-all duration-200 ${
                    ['/blog', '/diary', '/contact', '/event'].includes(location.pathname)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>Content</span>
                  <FiChevronDown className="text-sm" />
                </Button>
              </Dropdown>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Action buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              {/* Maximize */}
              <Button
                type="text"
                shape="circle"
                icon={<FiMaximize />}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                title="Maximize"
              />

              {/* Theme toggle */}
              <Button
                type="text"
                shape="circle"
                icon={isDark ? <FiSun className="text-amber-500" /> : <FiMoon className="text-blue-600" />}
                onClick={() => dispatch(changeTheme(!isDark))}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                title="Toggle Theme"
              />

              {/* Notifications */}
              <Badge count={3} size="small">
                <Button
                  type="text"
                  shape="circle"
                  icon={<FiBell />}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  title="Notifications"
                />
              </Badge>
            </div>

            {/* User menu */}
            <Dropdown 
              menu={{ items: userMenuItems }} 
              placement="bottomRight"
              trigger={['click']}
            >
              <Button
                type="text"
                className="flex items-center gap-3 px-3 py-1 h-auto rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Avatar src={user?.avatar?.url} size={32} />
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{userRoleFormate[user?.role] || "User"}</div>
                </div>
                <FiChevronDown className="text-gray-400" />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
