import { motion } from 'framer-motion';
import { FileText, Download, Target, Play, Eye } from 'lucide-react';

export default function ResumeBuilder() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Resume Builder & Portfolio</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn"><Eye size={16}/> Preview Portfolio</button>
          <button className="btn btn-primary"><Download size={16}/> Export PDF</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '500px' }}>
        
        {/* Sidebar Controls */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="card" style={{ padding: '16px' }}>
             <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Target size={16}/> Target Role
             </h4>
             <input type="text" className="form-control" placeholder="e.g., Java Backend Developer" defaultValue="Java Backend Developer" />
             <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '8px' }}>Smart Recommendations:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                   <span className="badge">Java</span>
                   <span className="badge">Spring Boot</span>
                   <span className="badge">MySQL</span>
                </div>
                <p style={{ fontSize: '0.75rem', marginTop: '8px', color: 'var(--text-secondary)' }}>We've highlighted your most relevant skills above.</p>
             </div>
          </div>

          <div className="card" style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
            <h4 style={{ marginBottom: '12px' }}>Included Sections</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                 <input type="checkbox" defaultChecked /> Personal Info
               </label>
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                 <input type="checkbox" defaultChecked /> Developer Links
               </label>
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                 <input type="checkbox" defaultChecked /> Education
               </label>
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                 <input type="checkbox" defaultChecked /> Skills (Filtered)
               </label>
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                 <input type="checkbox" defaultChecked /> Projects (2 selected)
               </label>
               <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                 <input type="checkbox" defaultChecked /> Certifications
               </label>
            </div>
          </div>

        </div>

        {/* Live Preview Area (Simulating PDF output) */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '8px', padding: '40px', color: '#000', overflowY: 'auto', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
           
           <div style={{ borderBottom: '2px solid #000', paddingBottom: '16px', marginBottom: '24px' }}>
              <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#111' }}>Aaditya</h1>
              <p style={{ margin: '8px 0 0 0', color: '#555' }}>
                 aaditya@example.com | +91 9876543210 | github.com/aaditya | linkedin.com/in/aaditya
              </p>
           </div>

           <div style={{ marginBottom: '24px' }}>
              <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '12px', color: '#333' }}>EDUCATION</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <strong>Indian Institute of Technology</strong>
                 <span>2023 - 2027</span>
              </div>
              <div>B.Tech in Computer Science</div>
           </div>

           <div style={{ marginBottom: '24px' }}>
              <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '12px', color: '#333' }}>SKILLS</h3>
              <p><strong>Languages:</strong> Java, Python, JavaScript, HTML/CSS</p>
              <p><strong>Frameworks:</strong> Spring Boot, React, Node.js</p>
              <p><strong>Databases:</strong> MySQL, PostgreSQL</p>
           </div>

           <div style={{ marginBottom: '24px' }}>
              <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '12px', color: '#333' }}>PROJECTS</h3>
              <div style={{ marginBottom: '12px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>DevTrack – Developer Portfolio</strong>
                    <span>Oct 2026 - Present</span>
                 </div>
                 <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>- Architected a full-stack Java Spring Boot and React application for students to track progress.</p>
                 <p style={{ fontSize: '0.9rem' }}>- Implemented JWT authentication and complex relational mappings using JPA/Hibernate.</p>
              </div>
           </div>

           <div style={{ marginBottom: '24px' }}>
              <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '12px', color: '#333' }}>CERTIFICATIONS</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <strong>AWS Certified Developer</strong>
                 <span>Jan 2026</span>
              </div>
           </div>

        </div>

      </div>
    </motion.div>
  );
}
