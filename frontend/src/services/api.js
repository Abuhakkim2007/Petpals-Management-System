const API_URL = 'http://localhost:5001/api'

// Pets API
export const petAPI = {
  getAll: async () => {
    try {
      console.log('Fetching pets from:', `${API_URL}/pets`)
      const response = await fetch(`${API_URL}/pets`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error fetching pets:', error)
      return []
    }
  },
  create: async (pet) => {
    try {
      console.log('Creating pet:', pet)
      const response = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet)
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error creating pet:', error)
      throw error
    }
  },
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/pets/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error deleting pet:', error)
      throw error
    }
  }
}

// Appointments API
export const appointmentAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/appointments`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error fetching appointments:', error)
      return []
    }
  },
  create: async (appointment) => {
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  },
  update: async (id, appointment) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error updating appointment:', error)
      throw error
    }
  },
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error deleting appointment:', error)
      throw error
    }
  }
}

// Medical History API
export const medicalAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/medical-history`)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error fetching medical records:', error)
      return []
    }
  },
  create: async (record) => {
    try {
      const response = await fetch(`${API_URL}/medical-history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error creating medical record:', error)
      throw error
    }
  },
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/medical-history/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (error) {
      console.error('Error deleting medical record:', error)
      throw error
    }
  }
}