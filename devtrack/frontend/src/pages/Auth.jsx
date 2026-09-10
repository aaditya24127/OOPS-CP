import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code, Terminal, MailCheck, AlertCircle } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Verification states
  const [verificationSent, setVerificationSent] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [resendMessage, setResendMessage] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up State
  const [signupData, setSignupData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    college: '', year: '1', branch: '', phone: '', photo: null
  });

  // Redirect if already logged in securely
  if (user && !verificationSent) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResendMessage(null);
    
    const emailToUse = loginEmail.trim().toLowerCase();

    // Attempt Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password: loginPassword,
    });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setUnverifiedEmail(emailToUse);
        setError("Please verify your email before signing in.");
      } else {
        setError(error.message);
      }
      setLoading(false);
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setLoading(true);

    const emailToUse = signupData.email.trim().toLowerCase();

    // Register with Supabase
    // We pass the callback URL explicitly to ensure it hits our new verification route
    const redirectUrl = `${window.location.origin}/auth/callback`;

    const { data, error } = await supabase.auth.signUp({
      email: emailToUse,
      password: signupData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: signupData.name,
          college: signupData.college,
          year: signupData.year,
          branch: signupData.branch,
          phone: signupData.phone
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Supabase returns an empty identities array if the email is already taken
    // and email confirmations are enabled (to prevent email enumeration).
    if (data?.user?.identities && data.user.identities.length === 0) {
      setError("An account with this email already exists. Please sign in instead.");
      setIsSignIn(true);
      setLoginEmail(emailToUse);
      setLoading(false);
      return;
    }

    // Account created successfully and verification required
    if (signupData.photo && data.user) {
      const fileExt = signupData.photo.name.split('.').pop();
      const filePath = `${data.user.id}/avatar.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, signupData.photo);
        
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from('profiles').getPublicUrl(filePath);
        await supabase.from('profiles').update({
          profile_photo_url: publicUrlData.publicUrl
        }).eq('id', data.user.id);
      }
    }
    
    setUnverifiedEmail(emailToUse);
    setVerificationSent(true);
    setLoading(false);
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail || resendCooldown) return;
    
    setResendCooldown(true);
    setError(null);
    setResendMessage(null);

    const redirectUrl = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: unverifiedEmail,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setResendMessage("Verification email sent successfully. Please check your inbox.");
    }

    // Prevent spamming
    setTimeout(() => {
      setResendCooldown(false);
    }, 60000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      
      {/* LEFT: Auth Forms */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px', overflowY: 'auto' }}>
        
        <div style={{ marginBottom: '40px', fontSize: '1.5rem', fontWeight: 'bold' }}>
          DevTrack <span style={{color: 'var(--text-secondary)'}}>.</span>
        </div>

        <div style={{ maxWidth: '400px', margin: 'auto', width: '100%' }}>
          <AnimatePresence mode="wait">
            {verificationSent ? (
               // Verification Sent State Overlay
               <motion.div
                 key="verification"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.3 }}
                 style={{ textAlign: 'center' }}
               >
                 <MailCheck size={64} color="var(--accent-primary)" style={{ margin: '0 auto 24px' }} />
                 <h1 style={{ marginBottom: '16px' }}>Account created successfully!</h1>
                 <p className="text-muted" style={{ marginBottom: '8px' }}>
                   A verification link has been sent to:
                 </p>
                 <p style={{ fontWeight: 'bold', marginBottom: '32px' }}>{unverifiedEmail}</p>
                 
                 <div style={{ padding: '16px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px', marginBottom: '32px' }}>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>Please check your inbox and click the verification link to verify your account.</p>
                 </div>

                 {resendMessage && (
                   <div style={{ padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', borderRadius: '6px', marginBottom: '24px', fontSize: '0.9rem' }}>
                     {resendMessage}
                   </div>
                 )}

                 {error && (
                   <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '6px', marginBottom: '24px', fontSize: '0.9rem' }}>
                     {error}
                   </div>
                 )}

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   <button 
                     onClick={handleResendVerification} 
                     disabled={resendCooldown}
                     className="btn" 
                     style={{ width: '100%', justifyContent: 'center', height: '44px' }}
                   >
                     {resendCooldown ? 'Wait 60s to resend' : 'Resend Verification Email'}
                   </button>
                   <button 
                     onClick={() => { setVerificationSent(false); setIsSignIn(true); setLoginEmail(unverifiedEmail); }} 
                     className="btn btn-primary" 
                     style={{ width: '100%', justifyContent: 'center', height: '44px' }}
                   >
                     Go to Sign In
                   </button>
                 </div>
               </motion.div>
            ) : (
              <motion.div
                key={isSignIn ? 'signin' : 'signup'}
                initial={{ opacity: 0, x: isSignIn ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isSignIn ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 style={{ marginBottom: '8px' }}>{isSignIn ? 'Welcome back' : 'Create an account'}</h1>
                <p className="text-muted" style={{ marginBottom: '32px' }}>
                  {isSignIn ? 'Enter your credentials to access your workspace.' : 'Start tracking your developer journey today.'}
                </p>

                {error && (
                  <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '6px', marginBottom: '24px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <AlertCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>{error}</div>
                    </div>
                  </div>
                )}
                
                {resendMessage && (
                  <div style={{ padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', borderRadius: '6px', marginBottom: '24px', fontSize: '0.9rem' }}>
                    {resendMessage}
                  </div>
                )}

                {isSignIn ? (
                  <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Email Address</label>
                      <input type="email" required className="form-control" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="aaditya@example.com" />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Password</label>
                      <div style={{ position: 'relative' }}>
                        <input type={showPassword ? "text" : "password"} required className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" style={{ paddingRight: '40px' }} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                          {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                      </div>
                    </div>
                    
                    {unverifiedEmail && (
                      <button 
                        type="button" 
                        onClick={handleResendVerification} 
                        disabled={resendCooldown}
                        style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}
                      >
                        {resendCooldown ? 'Wait 60s to resend' : 'Resend Verification Email'}
                      </button>
                    )}

                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '16px', justifyContent: 'center', height: '44px' }}>
                      {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Full Name</label>
                        <input type="text" required className="form-control" value={signupData.name} onChange={(e) => setSignupData({...signupData, name: e.target.value})} placeholder="Aaditya" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Email</label>
                        <input type="email" required className="form-control" value={signupData.email} onChange={(e) => setSignupData({...signupData, email: e.target.value})} placeholder="aaditya@college.edu" />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ flex: 2 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>College/University</label>
                        <input type="text" required className="form-control" value={signupData.college} onChange={(e) => setSignupData({...signupData, college: e.target.value})} placeholder="IIT" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Year</label>
                        <select required className="form-control" value={signupData.year} onChange={(e) => setSignupData({...signupData, year: e.target.value})}>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                          <option value="5">Graduated</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Branch</label>
                        <input type="text" required className="form-control" value={signupData.branch} onChange={(e) => setSignupData({...signupData, branch: e.target.value})} placeholder="CSE" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Phone</label>
                        <input type="tel" className="form-control" value={signupData.phone} onChange={(e) => setSignupData({...signupData, phone: e.target.value})} placeholder="+91" />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Set Password</label>
                        <input type="password" required className="form-control" value={signupData.password} onChange={(e) => setSignupData({...signupData, password: e.target.value})} placeholder="••••••••" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Confirm Password</label>
                        <input type="password" required className="form-control" value={signupData.confirmPassword} onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})} placeholder="••••••••" />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Profile Photo (Optional)</label>
                      <input type="file" accept="image/*" className="form-control" onChange={(e) => setSignupData({...signupData, photo: e.target.files[0]})} />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '16px', justifyContent: 'center', height: '44px' }}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </form>
                )}

                <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {isSignIn ? "Don't have an account? " : "Already have an account? "}
                  <button onClick={() => { setIsSignIn(!isSignIn); setError(null); }} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 'bold' }}>
                    {isSignIn ? 'Create Account' : 'Sign In'}
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT: Visual / 3D Experience (Hidden on small screens) */}
      <div style={{ flex: 1, backgroundColor: '#0a0a0f', position: 'relative', overflow: 'hidden', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Subtle Decorative Elements */}
        <div style={{ position: 'absolute', top: '10%', left: '10%', opacity: 0.5 }}><Code size={48} color="#3b82f6" /></div>
        <div style={{ position: 'absolute', bottom: '15%', right: '15%', opacity: 0.3 }}><Terminal size={64} color="#10b981" /></div>
        
        {/* 3D Canvas */}
        <div style={{ width: '100%', height: '500px', cursor: 'grab' }}>
          <Canvas camera={{ position: [0, 0, 4] }}>
             <ambientLight intensity={0.5} />
             <directionalLight position={[2, 2, 2]} intensity={1} />
             <Float speed={2} rotationIntensity={1} floatIntensity={2}>
               <Sphere args={[1, 64, 64]}>
                 <MeshDistortMaterial color="#1e3a8a" attach="material" distort={0.4} speed={1.5} roughness={0.2} metalness={0.8} />
               </Sphere>
             </Float>
             <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>

        <div style={{ position: 'absolute', bottom: '10%', textAlign: 'center', maxWidth: '300px' }}>
           <h3 style={{ marginBottom: '8px' }}>Your Developer Command Center</h3>
           <p className="text-muted" style={{ fontSize: '0.9rem' }}>Track skills, manage projects, and generate professional resumes in one unified platform.</p>
        </div>
      </div>
    </div>
  );
}
