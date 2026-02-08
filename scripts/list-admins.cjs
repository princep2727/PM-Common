const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

try {
    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();

    async function listAdmins() {
        console.log("Searching for admins...");
        try {
            const snapshot = await db.collection('users').where('role', '==', 'admin').get();

            if (snapshot.empty) {
                console.log("No admins found.");
                return;
            }

            console.log("\nFound " + snapshot.size + " admin(s):");
            console.log("------------------------------------------------");
            snapshot.forEach(doc => {
                const data = doc.data();
                console.log(`UID:   ${doc.id}`);
                console.log(`Email: ${data.email}`);
                console.log(`Name:  ${data.displayName}`);
                console.log("------------------------------------------------");
            });

        } catch (error) {
            console.error("Error listing admins:", error);
        }
    }

    listAdmins();

} catch (error) {
    console.error("Error:", error.message);
}
