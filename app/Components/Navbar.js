"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState(false);

  return (
    <nav className="flex justify-between items-center text-white md:h-15 flex-col md:flex-row p-4 bg-gray-900">
      <Link
        href={"/"}
        className="logo font-bold text-lg flex  justify-center items-center"
      >
        <img src="tea.gif" width={55}></img>
        <span className="text-2xl md:text-base my-5 md:my-0">Getmeachai</span>
      </Link>
      <div className="relative flex flex-col md:block gap-2">
        {session && (
          <>
            {" "}
            <button
              onClick={() => setshowdropdown(!showdropdown)}
              onBlur={() => {
                setTimeout(() => {
                  setshowdropdown(false);
                }, 300);
              }}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.email}
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[125px]  bg-gray-800 border border-gray-800 rounded-base shadow-lg w-44`}
            >
              <ul
                className="p-2 text-sm text-body font-medium "
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                   href={`/${session.user.username}`} 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your page
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={() => signOut()}
                    href="/login" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {session && (
          <button
            className="m-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={"/login"}>
            <button className="m-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
