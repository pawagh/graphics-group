'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import Image from 'next/image';

// Lazy load heavy components to improve initial load time
const ContentEditor = lazy(() => import('@/components/admin/ContentEditor'));
const PublicationManager = lazy(() => import('@/components/admin/PublicationManager'));

export default function AdminDashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');

  // Move hooks before any conditional returns
  const menuItems = useMemo(() => [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'content', label: 'Edit Content', icon: '✏️' },
    { id: 'people', label: 'Manage People', icon: '👥' },
    { id: 'publications', label: 'Publications', icon: '📚' },
    { id: 'courses', label: 'Courses', icon: '🎓' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ], []);

  const handleLogout = useCallback(() => {
    logout();
    router.push('/admin/login');
  }, [logout, router]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-carolina-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Loading component for lazy-loaded sections
  const SectionLoader = () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-carolina-blue"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="VCAIL Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-unc-navy">VCAIL Admin</h1>
                <p className="text-sm text-gray-600">Content Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-carolina-blue text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Website Status</h3>
                  <p className="text-green-600 font-medium">✅ Online</p>
                  <p className="text-sm text-gray-600 mt-1">Last updated: Just now</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Publications</h3>
                  <p className="text-2xl font-bold text-carolina-blue">12</p>
                  <p className="text-sm text-gray-600 mt-1">Research papers & articles</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Members</h3>
                  <p className="text-2xl font-bold text-carolina-blue">4</p>
                  <p className="text-sm text-gray-600 mt-1">Faculty & students</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'content' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Website Content</h2>
              <Suspense fallback={<SectionLoader />}>
                <ContentEditor />
              </Suspense>
            </div>
          )}

          {activeSection === 'people' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Team Members</h2>
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                    <button className="bg-carolina-blue hover:bg-unc-navy text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Add New Member
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/praneeth.jpeg"
                          alt="Praneeth Chakravarthula"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">Praneeth Chakravarthula</h4>
                          <p className="text-sm text-gray-600">Assistant Professor</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 px-3 py-1 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/XiPeng.jpg"
                          alt="Xi Peng"
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">Xi Peng</h4>
                          <p className="text-sm text-gray-600">PhD Student</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 px-3 py-1 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'publications' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Publications</h2>
              <Suspense fallback={<SectionLoader />}>
                <PublicationManager />
              </Suspense>
            </div>
          )}

          {activeSection === 'courses' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Courses</h2>
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Course Offerings</h3>
                    <button className="bg-carolina-blue hover:bg-unc-navy text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Add Course
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center text-gray-500 py-8">
                    <p>Course management interface coming soon...</p>
                    <p className="text-sm mt-2">You&apos;ll be able to add and update course information.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Account</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                            defaultValue={user.name}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                            defaultValue={user.email}
                          />
                        </div>
                        <button className="bg-carolina-blue hover:bg-unc-navy text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Update Profile
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
                          />
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
