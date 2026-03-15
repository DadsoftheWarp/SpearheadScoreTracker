import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../firebase.js';

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches;
}

function isIOS() {
  return /iP(ad|hone|od)/.test(navigator.userAgent);
}

const provider = new GoogleAuthProvider();

// Ensure auth state survives page reloads
setPersistence(auth, browserLocalPersistence).catch(() => {});

export function useAuth() {
  // null = still resolving, false = signed out, object = signed-in user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Handle redirect result (standalone PWA + iOS redirect flow).
    // When the popup flow navigates back into our app inside the popup window,
    // getRedirectResult processes the auth and we close the popup so the user
    // ends up back on the original tab already signed in.
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
          setLoading(false);
          // If we're inside a popup window, close it — the original tab
          // gets the auth state update via onAuthStateChanged + localStorage.
          if (window.opener && !window.opener.closed) {
            window.close();
          }
        }
      })
      .catch((err) => {
        if (err?.code && err.code !== 'auth/null-user') {
          setAuthError(err?.message ?? 'Sign-in failed. Please try again.');
        }
      });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? false);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signIn() {
    setAuthError(null);
    try {
      // iOS Safari doesn't support popup auth reliably — use redirect instead.
      // Desktop browsers get the standard popup experience.
      if (isStandalone() || isIOS()) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
      }
    } catch (err) {
      const code = err?.code ?? '';
      if (code === 'auth/cancelled-popup-request') return;
      if (code === 'auth/popup-blocked') {
        setAuthError('Pop-up was blocked. Please allow pop-ups for this site, or add it to your Home Screen and sign in from there.');
      } else if (code === 'auth/unauthorized-domain') {
        setAuthError('This domain is not authorized in Firebase. Add it in Firebase Console → Authentication → Authorized domains.');
      } else if (code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in was cancelled. Try again.');
      } else {
        setAuthError(err?.message ?? 'Sign-in failed. Please try again.');
      }
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  return { user, loading, signIn, signOut, authError };
}
