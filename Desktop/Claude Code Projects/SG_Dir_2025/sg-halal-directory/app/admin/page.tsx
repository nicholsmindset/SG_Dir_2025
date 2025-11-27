import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard | Singapore Halal Directory',
  description: 'Admin control panel for managing the halal directory',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noimageindex: true,
    "max-snippet": -1,
    "max-image-preview": "none",
    "max-video-preview": -1,
  },
}

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && url.startsWith('http') && !url.includes('your_supabase');
};

export default async function AdminDashboardPage() {
  let totalBusinesses = 127;
  let pendingBusinesses = 5;
  let pendingClaims = 3;
  let activeCoupons = 8;
  let featuredBusinesses = 24;
  let totalUsers = 1543;

  // Only fetch from Supabase if configured
  if (isSupabaseConfigured()) {
    const { createClient } = await import('@/utils/supabase/server');
    const { redirect } = await import('next/navigation');

    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect('/auth/login?redirect=/admin');
    }

    // Check admin status
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      redirect('/');
    }

    // Fetch statistics
    const [
      { count: tb },
      { count: pb },
      { count: pc },
      { count: ac },
      { count: fb },
      { count: tu }
    ] = await Promise.all([
      supabase.from('businesses').select('*', { count: 'exact', head: true }),
      supabase.from('businesses').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('business_claims').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('coupon_codes').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('businesses').select('*', { count: 'exact', head: true }).eq('is_featured', true),
      supabase.from('profiles').select('*', { count: 'exact', head: true })
    ]);

    totalBusinesses = tb || 0;
    pendingBusinesses = pb || 0;
    pendingClaims = pc || 0;
    activeCoupons = ac || 0;
    featuredBusinesses = fb || 0;
    totalUsers = tu || 0;
  }

  // Mock recent activity - replace with actual data
  const recentActivity = [
    { id: 1, action: 'New business submitted', details: 'Halal Kitchen - Pending review', time: '5 mins ago', icon: 'store', color: 'blue' },
    { id: 2, action: 'Claim request', details: 'John Doe claimed Nasi Lemak Paradise', time: '15 mins ago', icon: 'verified', color: 'orange' },
    { id: 3, action: 'Business approved', details: 'Saffron Restaurant is now live', time: '1 hour ago', icon: 'check_circle', color: 'green' },
    { id: 4, action: 'Featured listing purchased', details: 'Zam Zam - 3 months', time: '2 hours ago', icon: 'star', color: 'yellow' },
    { id: 5, action: 'New user registered', details: 'sarah@example.com', time: '3 hours ago', icon: 'person_add', color: 'purple' },
  ]

  return (
    <div>
      {/* Demo Mode Banner */}
      {!isSupabaseConfigured() && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-yellow-600">info</span>
          <div>
            <p className="font-medium text-yellow-800">Demo Mode</p>
            <p className="text-sm text-yellow-700">Supabase is not configured. Showing sample data. Configure your .env.local file to connect to your database.</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#343A40]">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the Singapore Halal Directory admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Businesses */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Businesses</p>
              <h3 className="text-3xl font-bold text-[#343A40]">{totalBusinesses}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">store</span>
            </div>
          </div>
          <Link href="/admin/businesses" className="text-sm font-medium text-blue-600 hover:text-blue-800 mt-4 inline-block">
            View all →
          </Link>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Businesses</p>
              <h3 className="text-3xl font-bold text-[#343A40]">{pendingBusinesses}</h3>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-600">pending</span>
            </div>
          </div>
          <Link href="/admin/businesses?status=pending" className="text-sm font-medium text-yellow-600 hover:text-yellow-800 mt-4 inline-block">
            Review now →
          </Link>
        </div>

        {/* Pending Claims */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Claims</p>
              <h3 className="text-3xl font-bold text-[#343A40]">{pendingClaims}</h3>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600">verified</span>
            </div>
          </div>
          <Link href="/admin/claims" className="text-sm font-medium text-orange-600 hover:text-orange-800 mt-4 inline-block">
            Review claims →
          </Link>
        </div>

        {/* Featured Businesses */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Featured Businesses</p>
              <h3 className="text-3xl font-bold text-[#343A40]">{featuredBusinesses}</h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">star</span>
            </div>
          </div>
          <Link href="/admin/businesses?featured=true" className="text-sm font-medium text-purple-600 hover:text-purple-800 mt-4 inline-block">
            View featured →
          </Link>
        </div>

        {/* Active Coupons */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Coupons</p>
              <h3 className="text-3xl font-bold text-[#343A40]">{activeCoupons}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">local_offer</span>
            </div>
          </div>
          <Link href="/admin/coupons" className="text-sm font-medium text-green-600 hover:text-green-800 mt-4 inline-block">
            Manage coupons →
          </Link>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h3 className="text-3xl font-bold text-[#343A40]">{totalUsers}</h3>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-600">group</span>
            </div>
          </div>
          <Link href="/admin/users" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
            View users →
          </Link>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#343A40] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/businesses?status=pending"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#17cf73] hover:bg-green-50 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-500">task_alt</span>
              <span className="text-sm font-medium text-[#343A40]">Approve Businesses</span>
            </Link>
            <Link
              href="/admin/claims"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#17cf73] hover:bg-green-50 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-500">verified</span>
              <span className="text-sm font-medium text-[#343A40]">Process Claims</span>
            </Link>
            <Link
              href="/admin/coupons"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#17cf73] hover:bg-green-50 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-500">add_circle</span>
              <span className="text-sm font-medium text-[#343A40]">Create Coupon</span>
            </Link>
            <Link
              href="/admin/events"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#17cf73] hover:bg-green-50 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-500">event</span>
              <span className="text-sm font-medium text-[#343A40]">Manage Events</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#343A40] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.color === 'blue' ? 'bg-blue-100' :
                  activity.color === 'orange' ? 'bg-orange-100' :
                  activity.color === 'green' ? 'bg-green-100' :
                  activity.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-purple-100'
                }`}>
                  <span className={`material-symbols-outlined text-lg ${
                    activity.color === 'blue' ? 'text-blue-600' :
                    activity.color === 'orange' ? 'text-orange-600' :
                    activity.color === 'green' ? 'text-green-600' :
                    activity.color === 'yellow' ? 'text-yellow-600' :
                    'text-purple-600'
                  }`}>{activity.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#343A40]">{activity.action}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.details}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
          <Link href="/admin/logs" className="text-sm font-medium text-[#17cf73] hover:text-[#13ec80] mt-4 inline-block">
            View all activity →
          </Link>
        </div>
      </div>
    </div>
  )
}
