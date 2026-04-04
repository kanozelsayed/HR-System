export default function Sidebar() {
  const menuItems = ["Job Feed", "My Applications", "Messages", "Profile", "Settings"];

  return (
    /* hidden md:block To hide sidebar im mobile*/
    <aside className="hidden md:block w-64 border-r bg-white h-[calc(100vh-64px)] sticky top-16 left-0 p-4">
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li 
            key={item} 
            className={`p-3 rounded-lg cursor-pointer text-sm font-medium transition-all 
              ${item === "Job Feed" 
                ? "bg-blue-50 text-blue-700 shadow-sm" 
                : "text-gray-600 hover:bg-gray-50 hover:pl-4" // Hover Effect
              }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
