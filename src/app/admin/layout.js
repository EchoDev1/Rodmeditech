import AdminNav from '@/components/AdminNav';

export const metadata = {
  title: 'Admin Portal - RodMeditech',
  description: 'RodMeditech Admin Portal',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
