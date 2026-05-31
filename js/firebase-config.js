// ==========================================
// Firebase Configuration
// ==========================================
// ⚠️ แก้ไขค่าด้านล่างให้ตรงกับ Firebase Project ของคุณ
// ไปที่: Firebase Console > Project Settings > General > Your apps > Firebase SDK snippet

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ==========================================
// Firestore Helper Functions (สำหรับหน้าเว็บหลัก)
// ==========================================

/**
 * ดึงข้อมูลศิษย์เก่าจาก Firestore
 */
async function getAlumni(batch) {
    try {
        let query = db.collection('alumni').orderBy('order', 'asc');
        if (batch) {
            query = query.where('batch', '==', batch);
        }
        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching alumni:', error);
        return [];
    }
}

/**
 * ดึงข้อมูลคณะครูจาก Firestore
 */
async function getTeachers() {
    try {
        const snapshot = await db.collection('teachers')
            .orderBy('order', 'asc')
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching teachers:', error);
        return [];
    }
}

/**
 * ดึงข้อมูลกิจกรรมจาก Firestore
 */
async function getActivities() {
    try {
        const snapshot = await db.collection('activities')
            .orderBy('order', 'asc')
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
}

/**
 * ดึงค่า config ของเว็บ (สถิติต่างๆ)
 */
async function getSiteConfig() {
    try {
        const doc = await db.collection('siteConfig').doc('stats').get();
        if (doc.exists) {
            return doc.data();
        }
        return { studentCount: 216, teacherCount: 8, alumniCount: 200 };
    } catch (error) {
        console.error('Error fetching site config:', error);
        return { studentCount: 216, teacherCount: 8, alumniCount: 200 };
    }
}

/**
 * ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
 */
async function checkIsAdmin(uid) {
    try {
        const doc = await db.collection('admins').doc(uid).get();
        return doc.exists;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}
