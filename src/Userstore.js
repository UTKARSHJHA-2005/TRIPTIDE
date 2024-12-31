import { create } from 'zustand';
import { db } from './db'; 
import { doc, getDoc } from 'firebase/firestore';

export const Userstore = create((set) => ({
  currentUser: null,
  isLoading: false,
  fetchUserInfo: async (uid) => {
    set({ isLoading: true }); 
    if (!uid) {
      set({ currentUser: null, isLoading: false });
      return;
    }
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.warn(`No user found with UID: ${uid}`);
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false });
    }
  },
  updateUserInfo: (updatedData) => {
    set((state) => ({
      currentUser: { ...state.currentUser, ...updatedData },
    }));
  },
}));
