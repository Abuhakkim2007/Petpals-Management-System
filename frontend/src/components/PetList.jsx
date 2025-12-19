import { petAPI } from '../services/api'

const PetList = ({ pets, setPets, searchTerm }) => {
  const deletePet = async (id) => {
    try {
      await petAPI.delete(id)
      setPets(pets.filter(pet => pet._id !== id))
    } catch (error) {
      console.error('Error deleting pet:', error)
      alert('Failed to delete pet. Please try again.')
    }
  }

  const filteredPets = pets.filter(pet => 
    pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="list-container">
      <div className="section-header">
        <h2>Pet Management System - Records ({filteredPets.length})</h2>
        <div className="summary-stats">
          <span className="stat">Total: {pets.length}</span>
          <span className="stat">Vaccinated: {pets.filter(p => p.isVaccinated).length}</span>
          <span className="stat">Active: {pets.filter(p => p.isConsulted).length}</span>
        </div>
      </div>
      {filteredPets.length === 0 ? (
        <p className="no-data">No pets found.</p>
      ) : (
        <div className="pet-grid">
          {filteredPets.map(pet => (
            <div key={pet._id} className="pet-card">
              <div className="pet-header">
                <div>
                  <h3>{pet.name}</h3>
                  <span className="pet-species">
                    {pet.species}
                  </span>
                </div>
                <button onClick={() => deletePet(pet._id)} className="delete-btn">Delete</button>
              </div>
              
              <div className="pet-details">
                <p><strong>Breed:</strong> <span>{pet.breed || 'Mixed'}</span></p>
                <p><strong>Age:</strong> <span>{pet.age ? `${pet.age} years` : 'Unknown'}</span></p>
                <p><strong>Owner:</strong> <span>{pet.owner}</span></p>
                {pet.ownerPhone && <p><strong>Contact:</strong> <span>{pet.ownerPhone}</span></p>}
                {pet.doctor && <p><strong>Doctor:</strong> <span>Dr. {pet.doctor}</span></p>}
                {pet.dutyInCharge && <p><strong>Care Manager:</strong> <span>{pet.dutyInCharge}</span></p>}
                <p><strong>Registration:</strong> <span>{pet.createdAt ? new Date(pet.createdAt).toLocaleDateString() : 'N/A'}</span></p>
              </div>
              
              <div className="status-badges">
                <span className={`badge ${pet.isVaccinated ? 'vaccinated' : 'not-vaccinated'}`}>
                  {pet.isVaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                </span>
                <span className={`badge ${pet.isConsulted ? 'consulted' : 'not-consulted'}`}>
                  {pet.isConsulted ? 'Consulted' : 'Not Consulted'}
                </span>
              </div>
              
              <div className="medical-info">
                <h4>Medical Information</h4>
                {pet.vaccinationDate && (
                  <p><strong>Last Vaccination:</strong> <span>{new Date(pet.vaccinationDate).toLocaleDateString()}</span></p>
                )}
                {pet.nextVaccinationDate && (
                  <p><strong>Next Vaccination:</strong> <span>{new Date(pet.nextVaccinationDate).toLocaleDateString()}</span></p>
                )}
                {pet.lastConsultDate && (
                  <p><strong>Last Consultation:</strong> <span>{new Date(pet.lastConsultDate).toLocaleDateString()}</span></p>
                )}
                {pet.nextConsultDate && (
                  <p><strong>Next Consultation:</strong> <span>{new Date(pet.nextConsultDate).toLocaleDateString()}</span></p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PetList