import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard - Singapore Halal Directory",
  description: "Manage your business listings and account settings.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noimageindex: true,
    "max-snippet": -1,
    "max-image-preview": "none",
    "max-video-preview": -1,
  },
};

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && url.startsWith('http') && !url.includes('your_supabase');
};

export default async function DashboardPage() {
  // Demo mode when Supabase is not configured
  if (!isSupabaseConfigured()) {
    const demoUser = {
      id: 'demo-user-id',
      email: 'demo@halalsg.com',
      user_metadata: { full_name: 'Demo User' }
    };
    return <DashboardClient user={demoUser} />;
  }

  // Production mode with real authentication
  const { getUser } = await import("@/app/actions/auth");
  const { redirect } = await import("next/navigation");

  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <DashboardClient user={user} />;
}
