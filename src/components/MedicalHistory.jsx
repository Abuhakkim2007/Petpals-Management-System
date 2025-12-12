import { useState } from 'react'

const MedicalHistory = ({ pets, medicalRecords, setMedicalRecords, searchTerm }) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    petId: '', date: '', type: '', diagnosis: '', treatment: '', doctor: '', cost: '', notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedPet = pets.find(pet => pet.id === parseInt(formData.petId))
    setMedicalRecords([...medicalRecords, {
      id: Date.now(),
      ...formData,
      petName: selectedPet?.name,
      petOwner: selectedPet?.owner,
      createdAt: new Date().toISOString()
    }])
    setFormData({
      petId: '', date: '', type: '', diagnosis: '', treatment: '', doctor: '', cost: '', notes: ''
    })
    setShowForm(false)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const deleteRecord = (id) => {
    setMedicalRecords(medicalRecords.filter(record => record.id !== id))
  }

  const filteredRecords = medicalRecords.filter(record =>
    record.petName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.petOwner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedRecords = filteredRecords.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="medical-history">
      <div className="section-header">
        <h2>🏥 Medical History</h2>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancel' : '➕ Add Record'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>Add Medical Record</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <select name="petId" value={formData.petId} onChange={handleChange} required>
                <option value="">Select Pet</option>
                {pets.map(pet => (
                  <option key={pet.id} value={pet.id}>{pet.name} - {pet.owner}</option>
                ))}
              </select>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-row">
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Record Type</option>
                <option value="checkup">Regular Checkup</option>
                <option value="vaccination">Vaccination</option>
                <option value="illness">Illness Treatment</option>
                <option value="surgery">Surgery</option>
                <option value="injury">Injury Treatment</option>
                <option value="dental">Dental Care</option>
                <option value="emergency">Emergency Visit</option>
              </select>
              <input 
                type="text" 
                name="doctor" 
                placeholder="Doctor Name" 
                value={formData.doctor} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <textarea 
              name="diagnosis" 
              placeholder="Diagnosis and findings..." 
              value={formData.diagnosis} 
              onChange={handleChange} 
              rows="3"
              required 
            />
            
            <textarea 
              name="treatment" 
              placeholder="Treatment provided..." 
              value={formData.treatment} 
              onChange={handleChange} 
              rows="2"
            />
            
            <div className="form-row">
              <input 
                type="number" 
                name="cost" 
                placeholder="Cost ($)" 
                value={formData.cost} 
                onChange={handleChange} 
                step="0.01"
                min="0"
              />
              <textarea 
                name="notes" 
                placeholder="Additional notes..." 
                value={formData.notes} 
                onChange={handleChange} 
                rows="2"
              />
            </div>
            
            <button type="submit">Add Record</button>
          </form>
        </div>
      )}

      <div className="records-list">
        <h3>Medical Records ({filteredRecords.length})</h3>
        {sortedRecords.length === 0 ? (
          <div className="no-data">No medical records found</div>
        ) : (
          <div className="records-grid">
            {sortedRecords.map(record => (
              <div key={record.id} className="record-card">
                <div className="record-header">
                  <div className="record-info">
                    <h4>{record.petName}</h4>
                    <span className={`record-type ${record.type}`}>
                      {record.type}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteRecord(record.id)}
                    className="delete-btn"
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="record-details">
                  <p><strong>📅 Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
                  <p><strong>👨⚕️ Doctor:</strong> {record.doctor}</p>
                  <p><strong>🔍 Diagnosis:</strong> {record.diagnosis}</p>
                  {record.treatment && (
                    <p><strong>💊 Treatment:</strong> {record.treatment}</p>
                  )}
                  {record.cost && (
                    <p><strong>💰 Cost:</strong> ${parseFloat(record.cost).toFixed(2)}</p>
                  )}
                  {record.notes && (
                    <p><strong>📝 Notes:</strong> {record.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicalHistory