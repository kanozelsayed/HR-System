export default function FakeDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            K
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {["Total Jobs", "Applications", "Messages"].map((stat) => (
            <div key={stat} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">{stat}</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
          <p className="text-gray-400">Welcome to your new dashboard! Real data will appear here soon.</p>
        </div>
      </div>
    </div>
  );
}