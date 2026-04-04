export default function Sidebar() {
  const menuItems = ["Job Feed", "My Applications", "Messages", "Profile", "Settings"];

  return (
    <aside className="w-64 border-r bg-white h-[calc(100vh-64px)] sticky left-0 p-4 hidden md:block">
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item} className={`p-3 rounded-lg cursor-pointer text-sm font-medium transition-colors ${item === "Job Feed" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}