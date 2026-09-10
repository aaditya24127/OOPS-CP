import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Target, Code2 } from 'lucide-react';

export default function Skills() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Skills & Learning</h2>
        <button className="btn btn-primary">+ Add Skill</button>
      </div>
      
      <div className="dashboard-grid">
        {/* Sample Skill Card */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={18} /> Java (Spring Boot)
            </div>
            <span className="badge">Intermediate</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
                  <span>Learning Progress</span>
                  <span>75%</span>
               </div>
               <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '75%', height: '100%', backgroundColor: 'var(--accent-primary)' }}></div>
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
               <div style={{ padding: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>12</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Resources</div>
               </div>
               <div style={{ padding: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>34</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Practice Probs</div>
               </div>
            </div>

            <button className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>Open Skill</button>
          </div>
        </div>

        {/* Empty State / Add New */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', borderStyle: 'dashed', backgroundColor: 'transparent' }}>
           <BookOpen size={32} style={{ color: 'var(--text-secondary)' }} />
           <div style={{ textAlign: 'center' }}>
             <h4 style={{ marginBottom: '4px' }}>Track a New Skill</h4>
             <p className="text-muted" style={{ fontSize: '0.85rem' }}>Add a new programming language or framework.</p>
           </div>
           <button className="btn">Add Skill</button>
        </div>
      </div>
    </motion.div>
  );
}
