import { useState } from 'react'
import { medicalAPI } from '../services/api'

const MedicalHistory = ({ pets, medicalRecords, setMedicalRecords, searchTerm }) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    petId: '', date: '', type: '', diagnosis: '', treatment: '', doctor: '', cost: '', notes: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newRecord = await medicalAPI.create(formData)
      setMedicalRecords([...medicalRecords, newRecord])
      setFormData({
        petId: '', date: '', type: '', diagnosis: '', treatment: '', doctor: '', cost: '', notes: ''
      })
      setShowForm(false)
    } catch (error) {
      console.error('Error creating medical record:', error)
      alert('Failed to create medical record. Please try again.')
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const deleteRecord = async (id) => {
    try {
      await medicalAPI.delete(id)
      setMedicalRecords(medicalRecords.filter(record => record._id !== id))
    } catch (error) {
      console.error('Error deleting medical record:', error)
      alert('Failed to delete medical record. Please try again.')
    }
  }

  const filteredRecords = medicalRecords.filter(record =>
    record.petId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.petId?.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedRecords = filteredRecords.sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="medical-history">
      <div className="section-header">
        <h2>Medical History</h2>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Record'}
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
                  <option key={pet._id} value={pet._id}>{pet.name} - {pet.owner}</option>
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
              <select name="doctor" value={formData.doctor} onChange={handleChange} required>
                <option value="">Select Doctor</option>
                <option value="Johnson">Dr. Johnson</option>
                <option value="Thilagam">Dr. Thilagam</option>
                <option value="Rohini">Dr. Rohini</option>
              </select>
            </div>
            
            <input 
              type="number" 
              name="cost" 
              placeholder="Cost (₹)" 
              value={formData.cost} 
              onChange={handleChange} 
              step="0.01"
              min="0"
            />
            
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
              <div key={record._id} className="record-card">
                <div className="record-header">
                  <div className="record-info">
                    <h4>{record.petId?.name || 'Unknown Pet'}</h4>
                    <span className={`record-type ${record.type}`}>
                      {record.type}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteRecord(record._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="record-details">
                  <p><strong>Date:</strong> <span>{new Date(record.date).toLocaleDateString()}</span></p>
                  <p><strong>Doctor:</strong> <span>{record.doctor}</span></p>
                  {record.cost && (
                    <p><strong>Cost:</strong> <span>₹{parseFloat(record.cost).toFixed(2)}</span></p>
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