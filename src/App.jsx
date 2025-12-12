import { useState, useEffect } from 'react'
import PetForm from './components/PetForm'
import PetList from './components/PetList'
import Dashboard from './components/Dashboard'
import Appointments from './components/Appointments'
import MedicalHistory from './components/MedicalHistory'
import Reports from './components/Reports'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('petpals-pets')
    return saved ? JSON.parse(saved) : []
  })
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('petpals-appointments')
    return saved ? JSON.parse(saved) : []
  })
  const [medicalRecords, setMedicalRecords] = useState(() => {
    const saved = localStorage.getItem('petpals-medical')
    return saved ? JSON.parse(saved) : []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('petpals-pets', JSON.stringify(pets))
  }, [pets])

  useEffect(() => {
    localStorage.setItem('petpals-appointments', JSON.stringify(appointments))
  }, [appointments])

  useEffect(() => {
    localStorage.setItem('petpals-medical', JSON.stringify(medicalRecords))
  }, [medicalRecords])

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'pets', label: 'Pets', icon: '🐾' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'medical', label: 'Medical', icon: '🏥' },
    { id: 'reports', label: 'Reports', icon: '📈' }
  ]

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="header-top">
          <h1>🐾 PetPals Management System</h1>
          <div className="header-controls">
            <input
              type="text"
              placeholder="🔍 Search pets, owners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        <nav className="nav-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {activeTab === 'dashboard' && (
          <Dashboard 
            pets={pets} 
            appointments={appointments} 
            medicalRecords={medicalRecords}
          />
        )}
        
        {activeTab === 'pets' && (
          <div className="pets-section">
            <PetForm pets={pets} setPets={setPets} />
            <PetList pets={pets} setPets={setPets} searchTerm={searchTerm} />
          </div>
        )}
        
        {activeTab === 'appointments' && (
          <Appointments 
            pets={pets}
            appointments={appointments}
            setAppointments={setAppointments}
            searchTerm={searchTerm}
          />
        )}
        
        {activeTab === 'medical' && (
          <MedicalHistory 
            pets={pets}
            medicalRecords={medicalRecords}
            setMedicalRecords={setMedicalRecords}
            searchTerm={searchTerm}
          />
        )}
        
        {activeTab === 'reports' && (
          <Reports 
            pets={pets}
            appointments={appointments}
            medicalRecords={medicalRecords}
          />
        )}
      </main>
    </div>
  )
}

export default App