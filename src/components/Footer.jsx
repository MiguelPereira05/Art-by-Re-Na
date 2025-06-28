import React from "react";

export default function Footer () {
    return (
  <footer className="w-full h-16 bg-stone-900  text-white flex items-center justify-center ">
    <p className="text-sm text-center font-bold">&copy; {new Date().getFullYear()} Art by Rena. All rights reserved.</p>
  </footer>
);
};