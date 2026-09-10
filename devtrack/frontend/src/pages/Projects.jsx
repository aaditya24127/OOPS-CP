import { motion } from 'framer-motion';
import { FolderGit2, Calendar, CheckSquare } from 'lucide-react';

export default function Projects() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Projects & Portfolio</h2>
        <button className="btn btn-primary">+ Create Project</button>
      </div>

      <div className="dashboard-grid">
        {/* Project Card */}
        <div className="card">
          <div className="card-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FolderGit2 size={18} /> DevTrack
            </div>
            <span className="badge badge-warning">In Progress</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>A full-stack student developer platform built with Java Spring Boot and React.</p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
               <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>Java</span>
               <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>React</span>
               <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>MySQL</span>
            </div>

            <div style={{ marginTop: '12px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CheckSquare size={14}/> Tasks</span>
                  <span>4/6 Completed</span>
               </div>
               <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '66%', height: '100%', backgroundColor: 'var(--warning)' }}></div>
               </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
               <span className="text-muted" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14}/> Due: Nov 30, 2026</span>
               <button className="btn" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>Open Project</button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', borderStyle: 'dashed', backgroundColor: 'transparent' }}>
           <FolderGit2 size={32} style={{ color: 'var(--text-secondary)' }} />
           <div style={{ textAlign: 'center' }}>
             <h4 style={{ marginBottom: '4px' }}>No Other Projects</h4>
             <p className="text-muted" style={{ fontSize: '0.85rem' }}>Add your academic or personal projects here.</p>
           </div>
           <button className="btn">Add Project</button>
        </div>
      </div>
    </motion.div>
  );
}
