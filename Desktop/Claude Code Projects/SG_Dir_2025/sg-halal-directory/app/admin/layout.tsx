import AdminSidebar from './AdminSidebar'

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && url.startsWith('http') && !url.includes('your_supabase');
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let userEmail = 'admin@halalsg.com';

  // Only check auth if Supabase is configured
  if (isSupabaseConfigured()) {
    const { createClient } = await import('@/lib/supabase/server');
    const { redirect } = await import('next/navigation');

    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      redirect('/auth/login');
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

    userEmail = user.email || '';
  }

  return (
    <div className="min-h-screen bg-[#f6f8f7]">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar userEmail={userEmail} />

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 pt-8">
          {children}
        </main>
      </div>
    </div>
  )
}
