export default function Navbar() {
  return (
    <nav className="h-16 border-b bg-white flex items-center px-8 sticky top-0 z-50 justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">SmartHire <span className="text-blue-600">AI</span></h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-gray-600 hover:text-blue-600">Post a Job</button>
        <div className="w-9 h-9 bg-gray-200 rounded-full border border-gray-300"></div>
      </div>
    </nav>
  );
}