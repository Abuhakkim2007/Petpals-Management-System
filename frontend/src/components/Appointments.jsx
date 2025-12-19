import { useState } from 'react'
import { appointmentAPI } from '../services/api'

const Appointments = ({ pets, appointments, setAppointments, searchTerm }) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    petId: '', date: '', time: '', type: '', doctor: '', notes: '', status: 'scheduled'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newAppointment = await appointmentAPI.create(formData)
      setAppointments([...appointments, newAppointment])
      setFormData({
        petId: '', date: '', time: '', type: '', doctor: '', notes: '', status: 'scheduled'
      })
      setShowForm(false)
    } catch (error) {
      console.error('Error creating appointment:', error)
      alert('Failed to create appointment. Please try again.')
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const updateStatus = async (id, status) => {
    try {
      const updatedAppointment = await appointmentAPI.update(id, { status })
      setAppointments(appointments.map(apt => 
        apt._id === id ? updatedAppointment : apt
      ))
    } catch (error) {
      console.error('Error updating appointment:', error)
      alert('Failed to update appointment. Please try again.')
    }
  }

  const deleteAppointment = async (id) => {
    try {
      await appointmentAPI.delete(id)
      setAppointments(appointments.filter(apt => apt._id !== id))
    } catch (error) {
      console.error('Error deleting appointment:', error)
      alert('Failed to delete appointment. Please try again.')
    }
  }

  const filteredAppointments = appointments.filter(apt =>
    apt.petId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.petId?.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedAppointments = filteredAppointments.sort((a, b) => 
    new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time)
  )

  return (
    <div className="appointments">
      <div className="section-header">
        <h2>Appointments Management</h2>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Appointment'}
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
                  <option key={pet._id} value={pet._id}>{pet.name} - {pet.owner}</option>
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
            
            <select name="doctor" value={formData.doctor} onChange={handleChange} required>
              <option value="">Select Doctor</option>
              <option value="Johnson">Dr. Johnson</option>
              <option value="Thilagam">Dr. Thilagam</option>
              <option value="Rohini">Dr. Rohini</option>
            </select>
            
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
              <div key={apt._id} className={`appointment-card ${apt.status}`}>
                <div className="appointment-header">
                  <div className="appointment-info">
                    <h4>{apt.petId?.name || 'Unknown Pet'}</h4>
                    <span className="appointment-type">{apt.type}</span>
                  </div>
                  <div className="appointment-actions">
                    <select 
                      value={apt.status} 
                      onChange={(e) => updateStatus(apt._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no-show">No Show</option>
                    </select>
                    <button 
                      onClick={() => deleteAppointment(apt._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="appointment-details">
                  <p><strong>Date:</strong> <span>{new Date(apt.date).toLocaleDateString()}</span></p>
                  <p><strong>Time:</strong> <span>{apt.time}</span></p>
                  <p><strong>Owner:</strong> <span>{apt.petId?.owner || 'Unknown Owner'}</span></p>
                  <p><strong>Doctor:</strong> <span>{apt.doctor}</span></p>
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