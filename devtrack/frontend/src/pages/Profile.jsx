import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>My Profile</h2>
      
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="card-title">Personal Information</h3>
        <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" defaultValue="Aaditya" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" defaultValue="aaditya@example.com" readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" defaultValue="+91 9876543210" />
          </div>

          <div className="form-group">
            <label className="form-label">College / University</label>
            <input type="text" className="form-control" defaultValue="Indian Institute of Technology" />
          </div>

          <div className="form-group">
            <label className="form-label">Graduation Year</label>
            <input type="number" className="form-control" defaultValue="2027" />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Short Bio</label>
            <textarea className="form-control" rows="4" defaultValue="Full-stack developer passionate about Java and React."></textarea>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" className="btn">Cancel</button>
            <button type="button" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">Manage Developer Links</h3>
        <p className="text-muted" style={{ marginBottom: '16px' }}>Add external profiles to showcase on your dashboard.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <strong style={{ minWidth: '120px' }}>GitHub</strong>
            <span className="text-muted" style={{ flex: 1 }}>github.com/aaditya</span>
            <button className="btn" style={{ padding: '4px 8px', fontSize: '0.85rem' }}>Edit</button>
            <button className="btn" style={{ padding: '4px 8px', fontSize: '0.85rem', color: 'var(--danger)' }}>Delete</button>
          </div>
          <button className="btn" style={{ alignSelf: 'flex-start' }}>+ Add New Link</button>
        </div>
      </div>
    </motion.div>
  );
}
