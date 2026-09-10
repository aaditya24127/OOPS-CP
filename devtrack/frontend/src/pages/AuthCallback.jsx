import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Check if there is an error in the URL (e.g. error=unauthorized_client&error_description=Email+link+is+invalid+or+has+expired)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const queryParams = new URLSearchParams(window.location.search);
    const urlError = hashParams.get('error_description') || queryParams.get('error_description') || hashParams.get('error') || queryParams.get('error');

    if (urlError) {
      setError(urlError.replace(/\+/g, ' '));
      return;
    }

    const checkSession = async () => {
      // Supabase js handles the session extraction from URL automatically
      const { data, error } = await supabase.auth.getSession();
      
      if (!isMounted) return;

      if (error) {
        setError(error.message);
        return;
      }

      if (data.session) {
        setSuccess(true);
      } else {
        // Wait briefly for onAuthStateChange to fire in case it's processing
        setTimeout(() => {
          if (isMounted && !success) {
            setError("Session expired or invalid verification link.");
          }
        }, 3000);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (isMounted && session) {
        setSuccess(true);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    // The requirement explicitly says to force the user to sign in manually after verification.
    // So we clear the session if it exists, and navigate to auth.
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '40px', backgroundColor: '#111827', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        {error ? (
          <>
             <XCircle size={48} color="var(--danger)" style={{ margin: '0 auto 16px' }} />
             <h2 style={{ marginBottom: '8px' }}>Verification Failed</h2>
             <p className="text-muted" style={{ marginBottom: '24px' }}>{error}</p>
             <button onClick={() => navigate('/auth')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '44px' }}>Go to Sign In</button>
          </>
        ) : success ? (
          <>
             <CheckCircle size={48} color="var(--accent-primary)" style={{ margin: '0 auto 16px' }} />
             <h2 style={{ marginBottom: '8px' }}>Email Verified Successfully</h2>
             <p className="text-muted" style={{ marginBottom: '24px' }}>Your DevTrack account is now verified. Continue by signing in with your email and password.</p>
             <button onClick={handleSignIn} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '44px' }}>Sign In</button>
          </>
        ) : (
          <>
             <div style={{ margin: '0 auto 24px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }} />
             <h2 style={{ marginBottom: '8px' }}>Verifying Email...</h2>
             <p className="text-muted">Please wait while we verify your account.</p>
             <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </>
        )}
      </motion.div>
    </div>
  );
}
