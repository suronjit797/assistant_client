/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Card, Col, Row, Statistic, Button, Avatar, List, Progress, Tag } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  UserOutlined,
  TransactionOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  BookOutlined
} from '@ant-design/icons';
import { 
  FiActivity, 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign,
  FiTarget,
  FiClock,
  FiCalendar,
  FiBookOpen,
  FiPlus
} from 'react-icons/fi';
import ModernCard from '@/components/ModernCard';
import { useAppSelector } from '@/redux/store';
import dayjs from 'dayjs';
import TaskCompletionChart from '@/components/charts/TaskCompletionChart';
import ActivityTrendChart from '@/components/charts/ActivityTrendChart';
import WeeklyActivityChart from '@/components/charts/WeeklyActivityChart';
import FinancialOverviewChart from '@/components/charts/FinancialOverviewChart';

const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const currentTime = dayjs().format('dddd, MMMM D, YYYY');
  const currentHour = dayjs().hour();
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock data - replace with real data from your APIs
  const stats = [
    {
      title: 'Total Tasks',
      value: 24,
      prefix: <FiTarget className="text-blue-500" />,
      suffix: '',
      precision: 0,
      trend: { value: 12, isPositive: true },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Completed',
      value: 18,
      prefix: <CheckCircleOutlined className="text-green-500" />,
      suffix: '',
      precision: 0,
      trend: { value: 8, isPositive: true },
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'This Month',
      value: 2580,
      prefix: <FiDollarSign className="text-purple-500" />,
      suffix: '',
      precision: 0,
      trend: { value: 15, isPositive: true },
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Active Projects',
      value: 7,
      prefix: <FiActivity className="text-orange-500" />,
      suffix: '',
      precision: 0,
      trend: { value: 3, isPositive: false },
      color: 'from-orange-500 to-red-500'
    },
  ];

  const recentTasks = [
    { id: 1, title: 'Complete project proposal', status: 'pending', priority: 'high', dueDate: '2024-01-15' },
    { id: 2, title: 'Review design mockups', status: 'completed', priority: 'medium', dueDate: '2024-01-14' },
    { id: 3, title: 'Update client documentation', status: 'pending', priority: 'low', dueDate: '2024-01-16' },
    { id: 4, title: 'Team meeting preparation', status: 'pending', priority: 'high', dueDate: '2024-01-15' },
    { id: 5, title: 'Code review session', status: 'completed', priority: 'medium', dueDate: '2024-01-13' },
  ];

  const quickActions = [
    { title: 'New Task', icon: <FiPlus />, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', action: () => {} },
    { title: 'Add Transaction', icon: <TransactionOutlined />, color: 'bg-gradient-to-r from-emerald-500 to-teal-500', action: () => {} },
    { title: 'Schedule Event', icon: <CalendarOutlined />, color: 'bg-gradient-to-r from-purple-500 to-pink-500', action: () => {} },
    { title: 'Write Note', icon: <BookOutlined />, color: 'bg-gradient-to-r from-orange-500 to-red-500', action: () => {} },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {getGreeting()}, {user?.name || 'Welcome'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{currentTime}</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Avatar src={user?.avatar?.url} size={64} className="border-4 border-white shadow-lg" />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <ModernCard variant="gradient" hoverable className="h-full group cursor-pointer overflow-hidden relative">
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{stat.prefix}</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {stat.trend.isPositive ? (
                        <ArrowUpOutlined className="text-green-500" />
                      ) : (
                        <ArrowDownOutlined className="text-red-500" />
                      )}
                      <span 
                        className={`text-sm font-semibold ${
                          stat.trend.isPositive ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {stat.trend.value}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      vs last month
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {stat.title}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {stat.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </ModernCard>
          </Col>
        ))}
      </Row>

      {/* Charts Section */}
      <Row gutter={[24, 24]} className="mb-8">
        {/* Activity Trend Chart */}
        <Col xs={24} xl={16}>
          <ModernCard title="Activity Trends" className="h-80">
            <ActivityTrendChart className="h-64" />
          </ModernCard>
        </Col>
        
        {/* Task Completion Chart */}
        <Col xs={24} xl={8}>
          <ModernCard title="Task Completion" className="h-80">
            <TaskCompletionChart completed={18} pending={6} className="h-64" />
          </ModernCard>
        </Col>
      </Row>

      {/* Weekly Analytics */}
      <Row gutter={[24, 24]} className="mb-8">
        {/* Weekly Activity */}
        <Col xs={24} lg={12}>
          <ModernCard title="Weekly Activity" className="h-80">
            <WeeklyActivityChart className="h-64" />
          </ModernCard>
        </Col>
        
        {/* Financial Overview */}
        <Col xs={24} lg={12}>
          <ModernCard title="Financial Overview" className="h-80">
            <FinancialOverviewChart className="h-64" />
          </ModernCard>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Recent Tasks */}
        <Col xs={24} lg={16}>
          <ModernCard 
            title="Recent Tasks" 
            extra={
              <Button type="primary" size="small" icon={<FiPlus />}>
                Add Task
              </Button>
            }
          >
            <List
              dataSource={recentTasks}
              renderItem={(task) => (
                <List.Item className="!border-gray-200 dark:!border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-4 py-3 transition-colors duration-200">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        task.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <h4 className={`font-medium ${
                          task.status === 'completed' 
                            ? 'line-through text-gray-500 dark:text-gray-400' 
                            : 'text-gray-800 dark:text-white'
                        }`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Due: {dayjs(task.dueDate).format('MMM D, YYYY')}
                        </p>
                      </div>
                    </div>
                    <Tag 
                      color={
                        task.priority === 'high' ? 'red' : 
                        task.priority === 'medium' ? 'orange' : 'blue'
                      }
                      className="!rounded-full"
                    >
                      {task.priority}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
          </ModernCard>
        </Col>

        {/* Quick Actions & Progress */}
        <Col xs={24} lg={8}>
          <div className="space-y-6">
            {/* Quick Actions */}
            <ModernCard title="Quick Actions">
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`
                      ${action.color}
                      text-white p-4 rounded-xl
                      hover:scale-105 transition-all duration-200
                      shadow-lg hover:shadow-xl
                      flex flex-col items-center space-y-2
                    `}
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-sm font-medium">{action.title}</span>
                  </button>
                ))}
              </div>
            </ModernCard>

            {/* Progress Overview */}
            <ModernCard title="This Month's Progress">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tasks Completed</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">18/24</span>
                  </div>
                  <Progress percent={75} strokeColor={{ from: '#3b82f6', to: '#06b6d4' }} className="!mb-0" strokeWidth={8} />
                </div>
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget Used</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">$2,580/$4,000</span>
                  </div>
                  <Progress percent={64} strokeColor={{ from: '#10b981', to: '#06b6d4' }} className="!mb-0" strokeWidth={8} />
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Tracked</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">128h/200h</span>
                  </div>
                  <Progress percent={64} strokeColor={{ from: '#f59e0b', to: '#f97316' }} className="!mb-0" strokeWidth={8} />
                </div>
              </div>
            </ModernCard>
            
            {/* Key Insights */}
            <ModernCard title="Key Insights" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <FiTrendingUp className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 dark:text-white">Productivity Up</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">15% increase this week</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                    <FiTarget className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 dark:text-white">Goals on Track</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">6 out of 8 monthly goals</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                    <FiClock className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 dark:text-white">Best Day</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Friday - 95% productivity</div>
                  </div>
                </div>
              </div>
            </ModernCard>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
