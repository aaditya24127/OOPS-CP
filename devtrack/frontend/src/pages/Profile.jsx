import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

export default function Profile() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [profileData, setProfileData] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    college: '',
    year: '',
    branch: '',
    bio: '',
    profile_photo_url: ''
  });

  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          setProfileData({
            name: data.name || '',
            email: data.email || user.email || '',
            phone: data.phone || '',
            college: data.college || '',
            year: data.year || '',
            branch: data.branch || '',
            bio: data.bio || '',
            profile_photo_url: data.profile_photo_url || ''
          });
        }
      } catch (err) {
        setError("Error loading profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      let photoUrl = profileData.profile_photo_url;

      // Handle photo upload if a new photo was selected
      if (newPhoto) {
        const fileExt = newPhoto.name.split('.').pop();
        const filePath = `${user.id}/avatar.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profiles')
          .upload(filePath, newPhoto, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('profiles')
          .getPublicUrl(filePath);
          
        photoUrl = publicUrlData.publicUrl;
        setProfileData(prev => ({ ...prev, profile_photo_url: photoUrl }));
      }

      // Update profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: profileData.name,
          phone: profileData.phone,
          college: profileData.college,
          year: profileData.year,
          branch: profileData.branch,
          bio: profileData.bio,
          profile_photo_url: photoUrl,
          updated_at: new Date()
        });

      if (updateError) throw updateError;
      
      // Also update auth user metadata so it reflects instantly globally if needed
      await supabase.auth.updateUser({
        data: { full_name: profileData.name, avatar_url: photoUrl }
      });

      setSuccess("Profile updated successfully!");
      setNewPhoto(null);
    } catch (err) {
      setError(err.message || "Failed to update profile");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading profile...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px' }}>My Profile</h2>
      
      {error && <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '6px', marginBottom: '24px' }}>{error}</div>}
      {success && <div style={{ padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', borderRadius: '6px', marginBottom: '24px' }}>{success}</div>}
      
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="card-title">Personal Information</h3>
        
        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-color)', overflow: 'hidden', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {newPhoto ? (
                  <img src={URL.createObjectURL(newPhoto)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : profileData.profile_photo_url ? (
                  <img src={profileData.profile_photo_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>{profileData.name?.charAt(0) || user.email?.charAt(0)}</span>
                )}
             </div>
             <div>
                <label className="btn" style={{ cursor: 'pointer' }}>
                  Change Photo
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                </label>
                <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '6px' }}>JPG, GIF or PNG. Max size of 2MB.</p>
             </div>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={profileData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={profileData.email} readOnly style={{ opacity: 0.7 }} title="Email is your authentication identity and cannot be changed here." />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" name="phone" className="form-control" value={profileData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">College / University</label>
            <input type="text" name="college" className="form-control" value={profileData.college} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Graduation Year</label>
            <input type="text" name="year" className="form-control" value={profileData.year} onChange={handleChange} />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Branch</label>
            <input type="text" name="branch" className="form-control" value={profileData.branch} onChange={handleChange} />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Short Bio</label>
            <textarea name="bio" className="form-control" rows="4" value={profileData.bio} onChange={handleChange}></textarea>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
