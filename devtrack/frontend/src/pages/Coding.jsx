import { motion } from 'framer-motion';
import { ExternalLink, RefreshCw, Trophy, Activity } from 'lucide-react';

export default function Coding() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Coding Progress</h2>
        <button className="btn btn-primary">+ Connect Platform</button>
      </div>

      <div className="dashboard-grid">
        {/* Connected Platform Card */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} /> Codeforces
            </div>
            <span className="badge badge-success">Connected</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span className="text-muted" style={{ fontSize: '0.9rem' }}>Handle: <strong>tourist</strong></span>
               <a href="#" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                  Profile <ExternalLink size={12}/>
               </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
               <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px' }}>
                  <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Rating</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3842</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--danger)' }}>Legendary Grandmaster</div>
               </div>
               <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px' }}>
                  <div className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Problems Solved</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1420</div>
               </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
               <span className="text-muted" style={{ fontSize: '0.75rem' }}>Last synced: 10 mins ago</span>
               <button className="btn" style={{ padding: '4px 8px', fontSize: '0.8rem' }}><RefreshCw size={14}/> Sync Now</button>
            </div>
          </div>
        </div>

        {/* Manual Fallback Card */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} /> Manual Tracking
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Track problems from platforms without API support manually.</p>
            
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                  <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>Two Sum</div>
                  <div className="text-muted" style={{ fontSize: '0.8rem' }}>LeetCode • Easy</div>
               </div>
               <span className="text-muted" style={{ fontSize: '0.8rem' }}>Oct 12</span>
            </div>

            <button className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>+ Add Problem manually</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
