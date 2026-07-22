"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Check if redirect contains paymentdone=true
    if (searchParams.get("paymentdone") === "true") {
      toast.success("Thanks for your donation!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      // Safely replace URL parameters without triggering full page refresh
      router.replace(`/${username}`);
    }
  }, [searchParams, username, router]);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u || {});
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key:
        currentUser?.razorpayid ||
        currentUser?.razorpayId ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "Get Me a Chai",
      description: "Test Transaction",
      image: currentUser?.profilepic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name || "Supporter",
        email: "supporter@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // Default Fallbacks for Profile & Cover Banner
  const defaultCover =
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop";
  const defaultProfile =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <>
      {/* Single ToastContainer Instance */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative">
        {/* Cover Banner with Fallback */}
        <img
          className="object-cover w-full md:h-80 h-64"
          src={currentUser?.coverpic && currentUser?.coverpic.trim() !== "" ? currentUser.coverpic : defaultCover}
          alt="Cover Banner"
        />

        {/* Profile Picture Container with Fallback */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 rounded-full border-4 border-white overflow-hidden size-28 shadow-lg bg-slate-800">
          <img
            className="w-full h-full object-cover"
            src={currentUser?.profilepic && currentUser?.profilepic.trim() !== "" ? currentUser.profilepic : defaultProfile}
            alt="Profile Picture"
          />
        </div>
      </div>

      <div className="info flex justify-center items-center flex-col my-14">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Lets help {username} get a chai!</div>
        <div className="text-slate-400">
          {payments.length} Payments . ₹
          {payments.reduce((a, b) => a + Number(b.amount || 0), 0)}
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
            <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length === 0 && <li>No payments yet</li>}
              {payments.map((p, i) => (
                <li key={i} className="my-2 flex items-center gap-2">
                  <span>
                    {p.name} donated <span className="font-bold">₹{p.amount}</span> with a message &quot;{p.message}&quot;
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                className="bg-slate-800 mx-6 mt-3 rounded-lg px-2 py-1.5 w-[86%]"
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                placeholder="Enter Name"
              />
              <input
                className="bg-slate-800 mx-6 my-1.5 rounded-lg px-2 py-1.5 w-[86%]"
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                placeholder="Enter Message"
              />
              <input
                className="bg-slate-800 mx-6 my-1.4 rounded-lg px-2 py-1.5 w-[86%]"
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="text"
                placeholder="Enter Amount"
              />
              <button
                type="button"
                onClick={() => pay(paymentform.amount)}
                className="text-white cursor-pointer mx-6 my-2 w-[86%] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center disabled:opacity-50"
                disabled={
                  !paymentform.name ||
                  paymentform.name.length < 3 ||
                  !paymentform.message ||
                  paymentform.message.length < 4 ||
                  !paymentform.amount
                }
              >
                Pay
              </button>
              <div className="mx-6 mt-1.5 mb-3 gap-3 flex flex-col md:flex-row">
                <button
                  className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 cursor-pointer text-sm"
                  onClick={() => pay(10)}
                >
                  Pay ₹10
                </button>
                <button
                  className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 cursor-pointer text-sm"
                  onClick={() => pay(30)}
                >
                  Pay ₹30
                </button>
                <button
                  className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 cursor-pointer text-sm"
                  onClick={() => pay(50)}
                >
                  Pay ₹50
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
