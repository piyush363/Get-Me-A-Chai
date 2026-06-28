"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateProfile, fetchuser } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
    const { data: session, update, status } = useSession();
    const router = useRouter();
    const [form, setform] = useState({
        name: "",
        email: "",
        username: "",
        profilepic: "",
        coverpic: ""
    });

    // HOOK 1: Handle Auth Redirects
    useEffect(() => {
        if (status !== "loading" && !session) {
            router.push("/login");
        }
    }, [router, session, status]);

    // HOOK 2: Fetch Profile Data from DB
    useEffect(() => {
        const getData = async () => {
            if (session?.user?.name) {
                let u = await fetchuser(session.user.name);
                if (u) {
                    setform(u);
                }
            }
        };
        getData();
    }, [session]);

    // --- MOVE THE LOADING CHECK HERE (AFTER ALL HOOKS) ---
    if (status === "loading") {
        return (
            <div className="text-center my-10 text-xl font-bold">
                Loading your dashboard...
            </div>
        );
    }

    // Event Handlers
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let a = await updateProfile(form, session?.user?.name);
           toast("Profile updated", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
    };


  return (
    <>
       <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
  
    

    <div className="min-h-screen py-10 px-4 text-white md:mx-45 mx-8">
      

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                value={form.name || ""}
                onChange={handleChange}
                type="text"
                name="name"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                value={form.email || ""}
                onChange={handleChange}
                type="email"
                name="email"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Username
              </label>

              <input
                value={form.username || ""}
                onChange={handleChange}
                type="text"
                name="username"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Profile Picture URL
              </label>

              <input
                value={form.profilepic || ""}
                onChange={handleChange}
                type="text"
                name="profilepic"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Cover Picture URL
              </label>

              <input
                value={form.coverpic || ""}
                onChange={handleChange}
                type="text"
                name="coverpic"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Razorpay ID
              </label>

              <input
                value={form.razorpayid || ""}
                onChange={handleChange}
                type="text"
                name="razorpayid"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Razorpay Secret
              </label>

              <input
                value={form.razorpaysecret || ""}
                onChange={handleChange}
                type="password"
                name="razorpaysecret"
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-[1.02] transition-all duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
 
  </>
);
 
};

export default Dashboard;
