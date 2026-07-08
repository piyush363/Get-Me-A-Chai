"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  //  const {data: session} = useState({})
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
    // 1. Only run this logic if the URL actually contains '?paymentdone=true'
    if (searchParams.get("paymentdone") === "true") {
        toast("Thanks for your donation!", {
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
        
        // 2. Clear the '?paymentdone=true' parameter from the URL safely 
        // ONLY after showing the toast notification.
        router.push(`/${username}`, { scroll: false });
    }
}, [searchParams, username, router]);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };
  const getData = async (params) => {
    let u = await fetchuser(username);
    console.log(u);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    console.log("Username", username);

    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key:
        currentUser?.razorpayid ||
        currentUser?.razorpayId ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits.
      currency: "INR",
      name: "Get Me a Chai", //your business name
      deScription: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, // This is a sample Order ID. Pass the id obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "+919876543210", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay via UPI",
              instruments: [
                {
                  method: "vpa", // This forces the manual UPI ID / Mobile Number box to show up
                },
                {
                  method: "upi", // This keeps the QR code option available
                },
              ],
            },
          },
          sequence: ["block.upi"],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
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

      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

    <div className="cover w-full relative">
  {/* Cover Banner - Increased height for desktop and mobile */}
  <img
    className="object-cover w-full md:h-80 h-64"
    src={currentUser.coverpic}
    alt="Cover Banner"
  />
  
  {/* Profile Picture Container - Enforced exact proportions for a perfect circle */}
  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 rounded-full border-4 border-white overflow-hidden size-28 shadow-lg">
    <img
      className="w-full h-full object-cover"
      src={currentUser.profilepic}
      alt="Profile Picture"
    />
  </div>
</div>
      <div className="info flex justify-center items-center flex-col my-14">
        <div>@{username}</div>
        <div className="text-slate-400">Lets help {username} get a chai!</div>
        <div className="text-slate-400">
          {payments.length} Payments . ₹
          {payments.reduce((a, b) => a + b.amount, 0)}
        </div>

       <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
                        {/* Show list of all the supporters as a leaderboard  */}
                        <h2 className='text-2xl font-bold my-5'> Top 10 Supporters</h2>
                        <ul className='mx-5 text-lg'>
                          {payments.length == 0 && <li>No payments yet</li>}
              {payments.map((p, i) => {
                return (
                  <li key={i}>
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message &quot;{p.message}&quot;
                    </span>
                  </li>
                );
              })}

                        </ul>
                    </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col '>
                            {/* input for name and message   */}
                            </div>


            <input
              className="bg-slate-800 mx-6 mt-3 rounded-lg px-2 py-1.5 w-[86%] md:w-[86%] "
              onChange={handleChange}
              value={paymentform.name}
              name="name"
              type="text"
              placeholder="Enter Name"
            ></input>
            <input
              className="bg-slate-800 mx-6 my-1.5 rounded-lg px-2 py-1.5 w-[86%] md:w-[90%]' "
              onChange={handleChange}
              value={paymentform.message}
              name="message"
              type="text"
              placeholder="Enter Message"
            ></input>
            <input
              className="bg-slate-800 mx-6 my-1.4 rounded-lg px-2 py-1.5 w-[86%] md:w-[92%]' "
              onChange={handleChange}
              value={paymentform.amount}
              name="amount"
              type="text"
              placeholder="Enter Amount"
            ></input>
            <button
              type="button"
              onClick={() => pay(paymentform.amount)}
              className="text-white cursor-pointer mx-6 my-2 md:w-[86%] w-[86%] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 disabled:from-purple-100"
              disabled={
                paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1
              }
            >
              Pay
            </button>
            <div className="mx-6 mt-1.5 mb-3 gap-3 flex flex-col md:flex-row">
              <button
                className="bg-slate-700 rounded-lg p-1 cursor-pointer"
                onClick={() => pay(10)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-700 rounded-lg p-1 cursor-pointer"
                onClick={() => pay(30)}
              >
                Pay ₹30
              </button>
              <button
                className="bg-slate-700 rounded-lg p-1 cursor-pointer"
                onClick={() => pay(50)}
              >
                Pay ₹50
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
