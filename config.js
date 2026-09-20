import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get, push, onValue, update, remove, runTransaction } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAkZkqcyP3P6QnbHT-wfxeygxgY9IoKBAU",
    authDomain: "oxi-esports.firebaseapp.com",
    projectId: "oxi-esports",
    storageBucket: "oxi-esports.firebasestorage.app",
    messagingSenderId: "924353594492",
    appId: "1:924353594492:web:08329a3d1f67e7a5da35f9",
    databaseURL: "https://oxi-esports-default-rtdb.firebaseio.com" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

function emailToKey(email) {
    return email.replace(/\./g, ',');
}

async function checkAdminLevel(email) {
    if (!email) return 'none';
    try {
        const key = emailToKey(email);
        
        const superAdminSnap = await get(ref(database, 'superAdmins/' + key));
        if (superAdminSnap.exists() && superAdminSnap.val() === true) return 'super';
        
        const adminSnap = await get(ref(database, 'admins/' + key));
        if (adminSnap.exists() && adminSnap.val() === true) return 'admin';
        
        return 'none';
    } catch (err) {
        console.error('Admin check error:', err);
        return 'none';
    }
}

export { 
    app, auth, database, googleProvider, 
    signInWithPopup, signOut, onAuthStateChanged, 
    ref, set, get, push, onValue, update, remove, runTransaction,
    emailToKey, checkAdminLevel
};