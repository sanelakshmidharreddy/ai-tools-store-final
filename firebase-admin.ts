import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
    } else {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
    }
  } catch (error) {
    console.warn("Firebase Admin failed to initialize. Make sure FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS is set.");
  }
}

export const db = admin.firestore();
export const firebaseAdmin = admin;
