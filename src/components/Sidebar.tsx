"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import {
  FiUser,
  FiGrid,
  FiFolder,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

interface NavItemProps {
  name: string;
  href: string;
  Icon: React.ElementType;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const links = [
    { name: "Overview", href: "/dashboard/overview", icon: FiGrid },
    { name: "Projects", href: "/dashboard/project", icon: FiFolder },
  ];

  const handleSignOut = async () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (!confirmSignOut) return;

    setIsSigningOut(true);

    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Error during sign-out:", error);
      alert("Failed to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <aside
      className={
        isOpen
          ? "relative bg-gray-900 text-white w-64 min-h-screen flex flex-col"
          : "relative bg-gray-900 text-white  min-h-screen flex flex-col w-1/3"
      }>
      <button
        className="absolute top-4 right-4 md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`md:flex flex-col h-full ${
          isOpen ? "block" : "hidden"
        } md:block`}>
        <div className="flex items-center space-x-3 p-4 border-b border-gray-700">
          <div className="w-12 h-12 hidden  bg-gray-600 rounded-full md:flex items-center justify-center">
            <FiUser size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
        </div>

        <nav className="flex-1 p-4 h-full">
          {links.map((link, index) => (
            <NavItem
              key={index}
              name={link.name}
              href={link.href}
              Icon={link.icon}
            />
          ))}

          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="absolute bottom-10 flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 transition w-full text-left">
            <FiLogOut size={20} />
            <span>{isSigningOut ? "Signing Out..." : "Logout"}</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

const NavItem: React.FC<NavItemProps> = ({ name, href, Icon }) => {
  return (
    <a
      href={href}
      className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 transition">
      <Icon size={20} />
      <span>{name}</span>
    </a>
  );
};

export default Sidebar;
