const admin = require("firebase-admin");
const path = require("path");

// Instructions:
// 1. Go to Firebase Console > Project Settings > Service Accounts
// 2. Click "Generate new private key"
// 3. Save the file as "serviceAccountKey.json" in this scripts/ folder
// 4. Run: node scripts/set-admin.cjs <USER_UID>

const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

  const args = process.argv.slice(2);
  const userId = args[0];

  if (!userId) {
    console.error("Please provide a User ID (UID) as an argument.");
    console.error("Usage: node scripts/set-admin.js <USER_UID>");
    process.exit(1);
  }

  async function setAdminRole(uid) {
    try {
      console.log(`Setting admin role for user: ${uid}...`);

      // Update the user document in Firestore
      const userRef = db.collection('users').doc(uid);
      await userRef.set({
        role: 'admin'
      }, { merge: true });

      console.log("✅ Success! User has been granted admin privileges.");
      console.log("They can now access the Admin Dashboard at /admin");
      process.exit(0);
    } catch (error) {
      console.error("Error setting admin role:", error);
      process.exit(1);
    }
  }

  setAdminRole(userId);

} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error("❌ Error: serviceAccountKey.json not found in scripts/ folder.");
    console.error("Please download it from Firebase Console and place it in the scripts folder.");
  } else {
    console.error("Error initializing Firebase Admin:", error);
  }
}
