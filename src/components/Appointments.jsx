import { useState } from 'react'

const Appointments = ({ pets, appointments, setAppointments, searchTerm }) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    petId: '', date: '', time: '', type: '', doctor: '', notes: '', status: 'scheduled'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedPet = pets.find(pet => pet.id === parseInt(formData.petId))
    setAppointments([...appointments, {
      id: Date.now(),
      ...formData,
      petName: selectedPet?.name,
      petOwner: selectedPet?.owner,
      createdAt: new Date().toISOString()
    }])
    setFormData({
      petId: '', date: '', time: '', type: '', doctor: '', notes: '', status: 'scheduled'
    })
    setShowForm(false)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const updateStatus = (id, status) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ))
  }

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id))
  }

  const filteredAppointments = appointments.filter(apt =>
    apt.petName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.petOwner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedAppointments = filteredAppointments.sort((a, b) => 
    new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time)
  )

  return (
    <div className="appointments">
      <div className="section-header">
        <h2>📅 Appointments Management</h2>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Cancel' : '➕ New Appointment'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>Schedule New Appointment</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <select name="petId" value={formData.petId} onChange={handleChange} required>
                <option value="">Select Pet</option>
                {pets.map(pet => (
                  <option key={pet.id} value={pet.id}>{pet.name} - {pet.owner}</option>
                ))}
              </select>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Appointment Type</option>
                <option value="checkup">Regular Checkup</option>
                <option value="vaccination">Vaccination</option>
                <option value="surgery">Surgery</option>
                <option value="emergency">Emergency</option>
                <option value="grooming">Grooming</option>
                <option value="dental">Dental Care</option>
              </select>
            </div>
            
            <div className="form-row">
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="time" 
                name="time" 
                value={formData.time} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <input 
              type="text" 
              name="doctor" 
              placeholder="Doctor Name" 
              value={formData.doctor} 
              onChange={handleChange} 
              required 
            />
            
            <textarea 
              name="notes" 
              placeholder="Appointment notes..." 
              value={formData.notes} 
              onChange={handleChange} 
              rows="3"
            />
            
            <button type="submit">Schedule Appointment</button>
          </form>
        </div>
      )}

      <div className="appointments-list">
        <h3>Appointments ({filteredAppointments.length})</h3>
        {sortedAppointments.length === 0 ? (
          <div className="no-data">No appointments found</div>
        ) : (
          <div className="appointments-grid">
            {sortedAppointments.map(apt => (
              <div key={apt.id} className={`appointment-card ${apt.status}`}>
                <div className="appointment-header">
                  <div className="appointment-info">
                    <h4>{apt.petName}</h4>
                    <span className="appointment-type">{apt.type}</span>
                  </div>
                  <div className="appointment-actions">
                    <select 
                      value={apt.status} 
                      onChange={(e) => updateStatus(apt.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no-show">No Show</option>
                    </select>
                    <button 
                      onClick={() => deleteAppointment(apt.id)}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="appointment-details">
                  <p><strong>📅 Date:</strong> {new Date(apt.date).toLocaleDateString()}</p>
                  <p><strong>⏰ Time:</strong> {apt.time}</p>
                  <p><strong>👤 Owner:</strong> {apt.petOwner}</p>
                  <p><strong>👨⚕️ Doctor:</strong> {apt.doctor}</p>
                  {apt.notes && <p><strong>📝 Notes:</strong> {apt.notes}</p>}
                </div>
                
                <div className={`status-badge ${apt.status}`}>
                  {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Appointments