import { useState, useEffect } from 'react'
import PetForm from './components/PetForm'
import PetList from './components/PetList'
import Dashboard from './components/Dashboard'
import Appointments from './components/Appointments'
import MedicalHistory from './components/MedicalHistory'
import Reports from './components/Reports'
import { petAPI, appointmentAPI, medicalAPI } from './services/api'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [pets, setPets] = useState([])
  const [appointments, setAppointments] = useState([])
  const [medicalRecords, setMedicalRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading data from API...')
        const [petsData, appointmentsData, medicalData] = await Promise.all([
          petAPI.getAll(),
          appointmentAPI.getAll(),
          medicalAPI.getAll()
        ])
        console.log('Data loaded:', { petsData, appointmentsData, medicalData })
        setPets(petsData)
        setAppointments(appointmentsData)
        setMedicalRecords(medicalData)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
    loadData()
  }, [])

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'pets', label: 'Pets' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'medical', label: 'Medical' },
    { id: 'reports', label: 'Reports' }
  ]

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="header-top">
          <h1>PetPals Management System</h1>
          <div className="header-controls">
            <input
              type="text"
              placeholder="Search pets, owners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? 'Light' : 'Dark'}
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