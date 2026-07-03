import PaymentPage from "../Components/PaymentPage";
import React from "react";
import { notFound } from "next/navigation";
import connectDb from "../db/connectDb";
import User from "../models/User";

export default async function Username({ params }) {
    const { username } = await params;
    await connectDb();
    
    // Check if user exists in db
    let u = await User.findOne({ username: username });
    if (!u) {
        return notFound();
    }

    return <PaymentPage username={username} />;
}

export async function generateMetadata({ params }) {
    const { username } = await params;
    return {
        title: `Support ${username} - Get Me A Chai`,
    };
}
