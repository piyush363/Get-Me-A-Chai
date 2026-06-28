import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import Payment from "@/app/models/Payment"; // Adjust based on your exact models path
// Make sure you import the right utility from razorpay utils:
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { model } from "mongoose";
import User from "@/app/models/User";
export const POST = async (req) => {
    try {
        // 1. Read the raw text first to see what kind of data came in
        const rawText = await req.text();
        let body;

        try {
            // Try parsing as JSON first
            body = JSON.parse(rawText);
        } catch (e) {
            // If it fails, it's URL-encoded form data (from the Razorpay redirect form)
            body = Object.fromEntries(new URLSearchParams(rawText));
        }

        console.log("Parsed Body Data:", body); // Temporary debug log

        // 2. Find the order record in your MongoDB
        let p = await Payment.findOne({ oid: body.razorpay_order_id });
        if (!p) {
            return NextResponse.json({ success: false, message: "Order id is not found" }, { status: 404 });
        }

        let user = await User.findOne({username: p.to_user})
        const secret = user.razorpaysecret

        // 3. Verify the signature using the official helper
        let xx = validatePaymentVerification(
            {
                "order_id": body.razorpay_order_id,
                "payment_id": body.razorpay_payment_id
            }, 
            body.razorpay_signature, 
            process.env.KEY_SECRET
        );

        // 4. Update database if verification passes
        if (xx) {
            const updatedPayment = await Payment.findOneAndUpdate(
                { oid: body.razorpay_order_id },
                { done: true },
                { new: true }
            );

            // Redirect smoothly to your frontend success page
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
        } else {
            return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
        }

    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
};