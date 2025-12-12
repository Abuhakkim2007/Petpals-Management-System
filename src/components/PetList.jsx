const PetList = ({ pets, setPets, searchTerm }) => {
  const deletePet = (id) => {
    setPets(pets.filter(pet => pet.id !== id))
  }

  const filteredPets = pets.filter(pet => 
    pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="list-container">
      <h2>🐾 Pet Records ({filteredPets.length})</h2>
      {filteredPets.length === 0 ? (
        <p className="no-data">No pets found.</p>
      ) : (
        <div className="pet-grid">
          {filteredPets.map(pet => (
            <div key={pet.id} className="pet-card">
              <div className="pet-header">
                <div>
                  <h3>{pet.name}</h3>
                  <span className="pet-species">
                    {pet.species === 'Dog' ? '🐕' : pet.species === 'Cat' ? '🐱' : '🐾'} {pet.species}
                  </span>
                </div>
                <button onClick={() => deletePet(pet.id)} className="delete-btn">×</button>
              </div>
              
              <div className="pet-details">
                <p><strong>Breed:</strong> {pet.breed || 'Not specified'}</p>
                <p><strong>Age:</strong> {pet.age ? `${pet.age} years` : 'Not specified'}</p>
                <p><strong>Owner:</strong> {pet.owner}</p>
                {pet.ownerPhone && <p><strong>Phone:</strong> {pet.ownerPhone}</p>}
                {pet.doctor && <p><strong>👨⚕️ Doctor:</strong> Dr. {pet.doctor}</p>}
                {pet.dutyInCharge && <p><strong>👮 Duty In-Charge:</strong> {pet.dutyInCharge}</p>}
              </div>
              
              <div className="status-badges">
                <span className={`badge ${pet.isVaccinated ? 'vaccinated' : 'not-vaccinated'}`}>
                  {pet.isVaccinated ? '💉 Vaccinated' : '⚠️ Not Vaccinated'}
                </span>
                <span className={`badge ${pet.isConsulted ? 'consulted' : 'not-consulted'}`}>
                  {pet.isConsulted ? '👨⚕️ Consulted' : '❌ Not Consulted'}
                </span>
              </div>
              
              {pet.vaccinationDate && (
                <p><strong>💉 Vaccination:</strong> {new Date(pet.vaccinationDate).toLocaleDateString()}</p>
              )}
              
              {pet.lastConsultDate && (
                <p><strong>👨⚕️ Last Consult:</strong> {new Date(pet.lastConsultDate).toLocaleDateString()}</p>
              )}
              
              {pet.nextConsultDate && (
                <p><strong>📅 Next Consult:</strong> {new Date(pet.nextConsultDate).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PetList