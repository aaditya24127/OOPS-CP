import { motion } from 'framer-motion';
import { Trophy, Award, ExternalLink, Calendar, Plus } from 'lucide-react';

export default function Achievements() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Certificates & Achievements</h2>
        <button className="btn btn-primary"><Plus size={16} /> Add Credential</button>
      </div>

      <div className="dashboard-grid">
        {/* Certificate Card */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} /> AWS Certified Developer
            </div>
            <span className="badge badge-success">Verified</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>Amazon Web Services (AWS)</div>
            
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
               <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>Credential ID: AWS-DEV-12345</div>
               <a href="#" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                  Verify Credential <ExternalLink size={12}/>
               </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
               <span className="text-muted" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14}/> Issued: Jan 2026</span>
               <button className="btn" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Edit</button>
            </div>
          </div>
        </div>

        {/* Hackathon Achievement Card */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={18} /> First Runner-Up
            </div>
            <span className="badge badge-warning">Hackathon</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>Global AI Hackathon 2025</div>
            
            <p style={{ fontSize: '0.85rem' }}>Built an AI-powered code reviewer that detects vulnerabilities using LLMs.</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
               <span className="text-muted" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14}/> Dec 2025</span>
               <button className="btn" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>View Proof</button>
            </div>
          </div>
        </div>

        {/* Empty State example */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', borderStyle: 'dashed', backgroundColor: 'transparent' }}>
           <Award size={32} style={{ color: 'var(--text-secondary)' }} />
           <div style={{ textAlign: 'center' }}>
             <h4 style={{ marginBottom: '4px' }}>Add Academic Honors</h4>
             <p className="text-muted" style={{ fontSize: '0.85rem' }}>Scholarships, Dean's List, etc.</p>
           </div>
           <button className="btn">Add Achievement</button>
        </div>
      </div>
    </motion.div>
  );
}
