import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { Activity, Code, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const RotatingCube = () => {
  return (
    <Box args={[1.5, 1.5, 1.5]} rotation={[0, 0, 0]}>
      <meshStandardMaterial color="#3b82f6" wireframe />
    </Box>
  );
};

export default function Dashboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Welcome Hero with 3D Element */}
      <div style={{ display: 'flex', gap: '24px', backgroundColor: 'var(--bg-secondary)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ flex: 1, zIndex: 1 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Good morning, Aaditya.</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Here's a quick look at your developer journey.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '200px', height: '8px', backgroundColor: 'var(--bg-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '80%', height: '100%', backgroundColor: 'var(--success)' }}></div>
            </div>
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>Profile 80% complete</span>
            <button className="btn">Complete Profile</button>
          </div>
        </div>
        <div style={{ width: '200px', height: '150px', position: 'absolute', right: '0', top: '0', opacity: 0.5 }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingCube />
            <OrbitControls autoRotate enableZoom={false} />
          </Canvas>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Next Steps / Smart Recommendations */}
        <div className="card" style={{ gridColumn: '1 / -1', backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--accent-primary)' }}>
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)' }}>
              <Target size={18} /> Smart Next Steps
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
             <button className="btn btn-primary">Complete Profile (80%)</button>
             <button className="btn">Add your GitHub Profile</button>
             <button className="btn">Create your first Resume</button>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} /> Overall Progress
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
               <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Skills Tracked</div>
               </div>
               <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>12</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Projects</div>
               </div>
               <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1,420</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Probs Solved</div>
               </div>
               <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success)' }}>2</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Certificates</div>
               </div>
            </div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ExternalLink size={18} /> Current Work
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <div style={{ padding: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>DevTrack Platform</strong>
                  <span className="badge badge-warning">In Progress</span>
               </div>
               <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                  4/6 tasks completed
               </div>
             </div>
             <a href="/projects" className="btn" style={{ justifyContent: 'center', marginTop: 'auto', textDecoration: 'none' }}>Manage Projects</a>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} /> Recent Activity
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
             
             <div style={{ minWidth: '200px', padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Created DevTrack Project</div>
                <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '4px' }}>Today, 10:45 AM</div>
             </div>

             <div style={{ minWidth: '200px', padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Added AWS Certificate</div>
                <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '4px' }}>Yesterday</div>
             </div>

             <div style={{ minWidth: '200px', padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', borderLeft: '3px solid var(--warning)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Solved 5 LeetCode problems</div>
                <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '4px' }}>Oct 12</div>
             </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
