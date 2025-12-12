import { useState } from 'react'

const PetForm = ({ pets, setPets }) => {
  const [formData, setFormData] = useState({
    name: '', species: '', breed: '', age: '', owner: '', ownerPhone: '',
    doctor: '', dutyInCharge: '', isVaccinated: false, vaccinationDate: '',
    isConsulted: false, lastConsultDate: '', nextConsultDate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setPets([...pets, { 
      id: Date.now(), 
      ...formData, 
      createdAt: new Date().toISOString() 
    }])
    setFormData({
      name: '', species: '', breed: '', age: '', owner: '', ownerPhone: '',
      doctor: '', dutyInCharge: '', isVaccinated: false, vaccinationDate: '',
      isConsulted: false, lastConsultDate: '', nextConsultDate: ''
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  return (
    <div className="form-container">
      <h2>🐾 Add New Pet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input 
            type="text" 
            name="name" 
            placeholder="Pet Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <select name="species" value={formData.species} onChange={handleChange} required>
            <option value="">Select Species</option>
            <option value="Dog">🐕 Dog</option>
            <option value="Cat">🐱 Cat</option>
            <option value="Bird">🦜 Bird</option>
            <option value="Rabbit">🐰 Rabbit</option>
            <option value="Other">🐾 Other</option>
          </select>
        </div>
        
        <div className="form-row">
          <input 
            type="text" 
            name="breed" 
            placeholder="Breed" 
            value={formData.breed} 
            onChange={handleChange} 
          />
          <input 
            type="number" 
            name="age" 
            placeholder="Age (years)" 
            value={formData.age} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-row">
          <input 
            type="text" 
            name="owner" 
            placeholder="Owner Name" 
            value={formData.owner} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="tel" 
            name="ownerPhone" 
            placeholder="Owner Phone" 
            value={formData.ownerPhone} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="form-row">
          <input 
            type="text" 
            name="doctor" 
            placeholder="Assigned Doctor" 
            value={formData.doctor} 
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="dutyInCharge" 
            placeholder="Duty In-Charge" 
            value={formData.dutyInCharge} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="checkbox-section">
          <h4>🏥 Medical Status</h4>
          <div className="checkbox-row">
            <label>
              <input 
                type="checkbox" 
                name="isVaccinated" 
                checked={formData.isVaccinated} 
                onChange={handleChange} 
              />
              <span>💉 Vaccinated</span>
            </label>
            <label>
              <input 
                type="checkbox" 
                name="isConsulted" 
                checked={formData.isConsulted} 
                onChange={handleChange} 
              />
              <span>👨⚕️ Consulted</span>
            </label>
          </div>
        </div>
        
        {formData.isVaccinated && (
          <div className="conditional-section">
            <h4>💉 Vaccination Details</h4>
            <label className="form-label">Vaccination Date</label>
            <input 
              type="date" 
              name="vaccinationDate"
              value={formData.vaccinationDate} 
              onChange={handleChange} 
            />
          </div>
        )}
        
        {formData.isConsulted && (
          <div className="conditional-section">
            <h4>👨⚕️ Consultation Details</h4>
            <div className="form-row">
              <div>
                <label className="form-label">Last Consultation Date</label>
                <input 
                  type="date" 
                  name="lastConsultDate"
                  value={formData.lastConsultDate} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <label className="form-label">Next Consultation Date</label>
                <input 
                  type="date" 
                  name="nextConsultDate"
                  value={formData.nextConsultDate} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>
        )}
        

        
        <button type="submit">Add Pet</button>
      </form>
    </div>
  )
}

export default PetForm