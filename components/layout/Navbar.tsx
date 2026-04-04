"use client";

import { useState, useEffect } from "react";
import { Menu, X, BriefcaseBusiness } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Effect to close the mobile menu automatically when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Add scroll event listener to window
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <nav className="bg-white border-b sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Branding & Logo Section */}
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <BriefcaseBusiness className="w-6 h-6" />
          <span>SmartHire AI</span>
        </div>

        {/* Mobile Hamburger Menu Button - Visible only on small screens */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
           <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-sm">
             Post a Job
           </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu - Animated appearance */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-b shadow-lg animate-in slide-in-from-top duration-300">
           <div className="px-4 py-4 flex flex-col gap-2">
             {["Job Feed", "My Applications", "Messages", "Profile", "Settings"].map((item) => (
               <a 
                 key={item} 
                 href="#" 
                 className="p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
               >
                 {item}
               </a>
             ))}
             
             {/* Divider for Action Button */}
             <hr className="my-2 border-gray-100" />
             
             <button className="bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-bold shadow-md active:scale-95 transition-all">
               Post a Job
             </button>
           </div>
        </div>
      )}
    </nav>
  );
}