'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  userEmail: string;
}

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    { href: '/admin', icon: 'dashboard', label: 'Dashboard' },
    { href: '/admin/businesses', icon: 'store', label: 'Businesses' },
    { href: '/admin/claims', icon: 'verified', label: 'Claims' },
    { href: '/admin/coupons', icon: 'local_offer', label: 'Coupons' },
    { href: '/admin/events', icon: 'event', label: 'Events' },
    { href: '/admin/users', icon: 'group', label: 'Users' },
    { href: '/admin/analytics', icon: 'analytics', label: 'Analytics' },
  ];

  return (
    <aside className="w-64 bg-white min-h-screen shadow-lg fixed left-0 top-0 z-40">
      {/* Admin Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white">admin_panel_settings</span>
          </div>
          <div>
            <h2 className="font-bold text-[#343A40]">Admin Panel</h2>
            <span className="text-xs text-red-600 font-semibold">ADMINISTRATOR</span>
          </div>
        </div>
      </div>

      {/* Admin Profile */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#17cf73] rounded-full flex items-center justify-center text-white font-semibold">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#343A40] truncate">{userEmail}</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Management</p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-[#17cf73] text-white'
                    : 'text-[#343A40] hover:bg-gray-100'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-6">Settings</p>
        <ul className="space-y-1">
          <li>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#343A40] hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined">settings</span>
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/admin/logs"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#343A40] hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined">receipt_long</span>
              Activity Logs
            </Link>
          </li>
        </ul>
      </nav>

      {/* Quick Links */}
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-lg">person</span>
          User Dashboard
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-lg">home</span>
          View Site
        </Link>
        <Link
          href="/auth/logout"
          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Logout
        </Link>
      </div>
    </aside>
  );
}
