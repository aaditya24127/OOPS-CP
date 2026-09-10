import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code, Github, Terminal, CheckCircle } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  // Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up State
  const [signupData, setSignupData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    college: '', year: '1', branch: '', phone: ''
  });

  // Redirect if already logged in
  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Attempt Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setLoading(true);
    setError(null);

    // Register with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
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
    } else {
      // In a real app, this would also ping the Spring Boot API to sync the user record to the DB
      navigate('/', { replace: true });
    }
    setLoading(false);
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
                  {error}
                </div>
              )}

              {isSignIn ? (
                <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Email / Username</label>
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
