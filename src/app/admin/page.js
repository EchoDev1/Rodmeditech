import Link from 'next/link';

export default function AdminDashboard() {
  const sections = [
    {
      title: 'About Page',
      description: 'Manage mission, vision, core values, and company milestones',
      href: '/admin/about',
      icon: '📋'
    },
    {
      title: 'Leadership/Founders',
      description: 'Add and edit founder profiles with photos and details',
      href: '/admin/founders',
      icon: '👥'
    },
    {
      title: 'Contact Page',
      description: 'Update contact information and FAQs',
      href: '/admin/contact',
      icon: '📞'
    }
  ];

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{section.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {section.title}
            </h2>
            <p className="text-gray-600">{section.description}</p>
            <div className="mt-4 text-blue-600 font-medium">
              Manage →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-gray-600">Founders</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-gray-600">Core Values</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-gray-600">Milestones</div>
          </div>
        </div>
      </div>
    </div>
  );
}
