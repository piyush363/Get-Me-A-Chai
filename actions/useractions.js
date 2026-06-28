"use server";

import Razorpay from "razorpay";
import Payment from "@/app/models/Payment";
import connectDb from "@/app//db/connectDb";
import User from "@/app/models/User";
import { Turret_Road } from "next/font/google";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;
  console.log(user);
  console.log(
    process.env.KEY_ID ? "yes, it has a value" : "No it is undefined",
  );

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

  // create a payment object which shows a pending payment in the database
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
 await connectDb();
let u = await User.findOne({ username: username });

// If no user is found in the database, return null safely
if (!u) {
    return null;
}

let user = u.toObject({ flattenObjectIds: true });
return user;
};

export const fetchpayments = async (username) => {
  await connectDb();
  let user = await User.findOne({ username: username });
  const secret = user.razorpaysecret;
  let p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean();
  return JSON.parse(JSON.stringify(p));
};

export const updateProfile = async (ndata, oldusername) => {
  // 1. ndata is directly the form object now
  await connectDb();

  // If they are trying to change their username
  if (oldusername !== ndata.username) {
    // FIX 1: Change pdata.username to ndata.username
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ username: oldusername }, ndata);
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username },
    );
  }

  // FIX 2: Change { email: ndata.email } to { username: oldusername }
  // This makes sure MongoDB updates the right user based on their current username
  else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};
