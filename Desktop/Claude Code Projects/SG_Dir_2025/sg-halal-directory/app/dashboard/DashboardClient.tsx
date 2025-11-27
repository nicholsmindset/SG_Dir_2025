'use client';

import Link from 'next/link';
import { useState } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const userName = user.user_metadata?.full_name || user.email.split('@')[0];

  // Mock stats - replace with actual data from database
  const stats = {
    submittedBusinesses: 3,
    savedListings: 12,
    totalReviews: 8,
  };

  // Mock submissions - replace with actual data
  const submissions = [
    {
      id: 1,
      name: 'Nasi Lemak Paradise',
      category: 'Restaurant',
      status: 'approved',
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'Halal Bakery Delights',
      category: 'Bakery',
      status: 'pending',
      date: '2024-01-18',
    },
    {
      id: 3,
      name: 'Muslim Mart',
      category: 'Grocery',
      status: 'rejected',
      date: '2024-01-20',
    },
  ];

  // Mock reviews - replace with actual data
  const recentReviews = [
    {
      id: 1,
      businessName: 'Saffron Kitchen',
      rating: 5,
      comment: 'Excellent food and great service! The biryani was authentic and delicious.',
      date: '2024-01-19',
    },
    {
      id: 2,
      businessName: 'Zam Zam Restaurant',
      rating: 4,
      comment: 'Good murtabak, slightly crowded during peak hours.',
      date: '2024-01-17',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`material-symbols-outlined text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        star
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-screen shadow-lg fixed left-0 top-0 pt-20 z-40">
          {/* User Profile */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#17cf73] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-[#343A40]">{userName}</h3>
                <p className="text-sm text-gray-500 truncate max-w-[140px]">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-[#17cf73] text-white'
                      : 'text-[#343A40] hover:bg-gray-100'
                  }`}
                >
                  <span className="material-symbols-outlined">dashboard</span>
                  Dashboard
                </button>
              </li>
              <li>
                <Link
                  href="/dashboard/my-claims"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-[#343A40] hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined">store</span>
                  My Businesses
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'saved'
                      ? 'bg-[#17cf73] text-white'
                      : 'text-[#343A40] hover:bg-gray-100'
                  }`}
                >
                  <span className="material-symbols-outlined">bookmark</span>
                  Saved Listings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'reviews'
                      ? 'bg-[#17cf73] text-white'
                      : 'text-[#343A40] hover:bg-gray-100'
                  }`}
                >
                  <span className="material-symbols-outlined">rate_review</span>
                  My Reviews
                </button>
              </li>
              <li>
                <Link
                  href="/badge-generator"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-[#343A40] hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined">verified</span>
                  Badge Generator
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-[#17cf73] text-white'
                      : 'text-[#343A40] hover:bg-gray-100'
                  }`}
                >
                  <span className="material-symbols-outlined">settings</span>
                  Settings
                </button>
              </li>
            </ul>
          </nav>

          {/* Logout */}
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              href="/auth/logout"
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              Logout
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 pt-24">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#343A40]">Dashboard</h1>
              <p className="text-gray-500">Welcome back, {userName}!</p>
            </div>
            <Link
              href="/submit"
              className="flex items-center gap-2 bg-[#17cf73] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#13ec80] transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
              Submit New Business
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Submitted Businesses</p>
                  <h3 className="text-3xl font-bold text-[#343A40]">{stats.submittedBusinesses}</h3>
                </div>
                <div className="w-12 h-12 bg-[#17cf73]/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#17cf73]">store</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Saved Listings</p>
                  <h3 className="text-3xl font-bold text-[#343A40]">{stats.savedListings}</h3>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-500">bookmark</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Reviews</p>
                  <h3 className="text-3xl font-bold text-[#343A40]">{stats.totalReviews}</h3>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-yellow-500">star</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/dashboard/claim-business"
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-emerald-600">verified</span>
                <h3 className="text-lg font-semibold text-emerald-900">Claim Your Business</h3>
              </div>
              <p className="text-sm text-emerald-800">
                Own a halal business? Claim your listing to manage information.
              </p>
            </Link>
            <Link
              href="/upgrade/featured"
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-yellow-600">star</span>
                <h3 className="text-lg font-semibold text-yellow-900">Get Featured</h3>
              </div>
              <p className="text-sm text-yellow-800">
                Boost your visibility with a featured listing.
              </p>
            </Link>
            <Link
              href="/badge-generator"
              className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-blue-600">code</span>
                <h3 className="text-lg font-semibold text-blue-900">Badge Generator</h3>
                <span className="px-2 py-0.5 bg-blue-400 text-blue-900 text-xs font-bold rounded-full">NEW</span>
              </div>
              <p className="text-sm text-blue-800">
                Earn 1 free month of featured listing ($29 value).
              </p>
            </Link>
          </div>

          {/* Business Submissions */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#343A40]">Your Business Submissions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Business Name</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#343A40]">{submission.name}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{submission.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusBadge(submission.status)}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{submission.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-500 hover:text-[#17cf73] transition-colors" title="View">
                            <span className="material-symbols-outlined text-xl">visibility</span>
                          </button>
                          <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors" title="Edit">
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-500 transition-colors" title="Delete">
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#343A40]">Your Recent Reviews</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-[#343A40]">{review.businessName}</h3>
                      <div className="flex gap-0.5 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                  <div className="flex gap-4 mt-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                      <span className="material-symbols-outlined text-lg">edit</span>
                      Edit
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-lg">delete</span>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
