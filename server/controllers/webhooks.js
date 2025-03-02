import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    console.log("🔹 Webhook received at:", new Date().toISOString());

    // Validate Timestamp to prevent "message timestamp too old" error
    const svixTimestamp = Number(req.headers["svix-timestamp"]);
    const now = Math.floor(Date.now() / 1000);

    if (!svixTimestamp || Math.abs(now - svixTimestamp) > 300) {
      // 5 min max
      console.error("❌ Webhook rejected: Message timestamp too old");
      return res
        .status(400)
        .json({ success: false, message: "Message timestamp too old" });
    }

    // Create a Svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook signature
    await whook.verify(req.rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Parse request body
    const { data, type } = req.body;
    console.log(`✅ Webhook verified: Event Type - ${type}`);

    // Handle different event types
    switch (type) {
      case "user.created": {
        console.log("🆕 Creating user:", data.id);
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        break;
      }

      case "user.updated": {
        console.log("✏️ Updating user:", data.id);
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.deleted": {
        console.log("🗑️ Deleting user:", data.id);
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", type);
        break;
    }

    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
