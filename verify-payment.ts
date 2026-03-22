import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import dotenv from "dotenv";
import { db, firebaseAdmin } from "./_lib/firebase-admin";

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment verified
      await db.collection("users").doc(userId).set({
        hasPurchased: true,
        paymentId: razorpay_payment_id,
        updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
