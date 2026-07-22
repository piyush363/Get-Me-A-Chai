"use server";

import Razorpay from "razorpay";
import Payment from "@/app/models/Payment";
import connectDb from "@/app/db/connectDb";
import User from "@/app/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  let user = await User.findOne({ username: to_username });

  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: Number.parseInt(amount) * 100,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  let x = await instance.orders.create(options);

  await Payment.create({
    oid: x.id,
    amount: amount,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return x;
};

export const fetchuser = async (username) => {
  await connectDb();
  const cleanUsername = username.trim().toLowerCase();
  
  // Use a case-insensitive regex match for username fetching
  let u = await User.findOne({ 
    username: { $regex: new RegExp(`^${cleanUsername}$`, "i") } 
  });

  if (!u) {
    return null;
  }

  // Convert to plain object safely so profilepic & coverpic fields pass cleanly to the Client Component
  return JSON.parse(JSON.stringify(u));
};

export const fetchpayments = async (username) => {
  await connectDb();
  const cleanUsername = username.trim().toLowerCase();

  let user = await User.findOne({ 
    username: { $regex: new RegExp(`^${cleanUsername}$`, "i") } 
  });
  if (!user) return [];

  let p = await Payment.find({ 
    to_user: { $regex: new RegExp(`^${cleanUsername}$`, 'i') }, 
    done: true 
  })
  .sort({ amount: -1 })
  .lean();

  return JSON.parse(JSON.stringify(p));
};

export const updateProfile = async (ndata, oldusername) => {
  await connectDb();

  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }

    await User.updateOne({ username: oldusername }, ndata);
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  } else {
    await User.updateOne({ username: oldusername }, ndata);
  }
};