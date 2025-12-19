import { useState } from 'react'

const Reports = ({ pets, appointments, medicalRecords }) => {
  const [reportType, setReportType] = useState('overview')

  const generateOverviewReport = () => {
    const totalPets = pets.length
    const vaccinatedPets = pets.filter(pet => pet.isVaccinated).length
    const consultedPets = pets.filter(pet => pet.isConsulted).length
    const totalAppointments = appointments.length
    const completedAppointments = appointments.filter(apt => apt.status === 'completed').length
    const totalMedicalRecords = medicalRecords.length
    
    const speciesBreakdown = pets.reduce((acc, pet) => {
      acc[pet.species] = (acc[pet.species] || 0) + 1
      return acc
    }, {})

    return {
      totalPets,
      vaccinatedPets,
      consultedPets,
      totalAppointments,
      completedAppointments,
      totalMedicalRecords,
      speciesBreakdown,
      vaccinationRate: totalPets ? ((vaccinatedPets / totalPets) * 100).toFixed(1) : 0,
      consultationRate: totalPets ? ((consultedPets / totalPets) * 100).toFixed(1) : 0
    }
  }

  const generateVaccinationReport = () => {
    const vaccinated = pets.filter(pet => pet.isVaccinated)
    const notVaccinated = pets.filter(pet => !pet.isVaccinated)
    const upcomingVaccinations = pets.filter(pet => {
      if (!pet.nextVaccinationDate) return false
      const nextDate = new Date(pet.nextVaccinationDate)
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      return nextDate <= thirtyDaysFromNow
    })

    return {
      vaccinated,
      notVaccinated,
      upcomingVaccinations,
      vaccinationsByMonth: getVaccinationsByMonth()
    }
  }

  const getVaccinationsByMonth = () => {
    const months = {}
    pets.forEach(pet => {
      if (pet.vaccinationDate) {
        const month = new Date(pet.vaccinationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        months[month] = (months[month] || 0) + 1
      }
    })
    return months
  }

  const generateFinancialReport = () => {
    const totalRevenue = medicalRecords.reduce((sum, record) => {
      return sum + (parseFloat(record.cost) || 0)
    }, 0)

    const revenueByMonth = medicalRecords.reduce((acc, record) => {
      if (record.cost) {
        const month = new Date(record.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        acc[month] = (acc[month] || 0) + parseFloat(record.cost)
      }
      return acc
    }, {})

    const revenueByType = medicalRecords.reduce((acc, record) => {
      if (record.cost) {
        acc[record.type] = (acc[record.type] || 0) + parseFloat(record.cost)
      }
      return acc
    }, {})

    return {
      totalRevenue,
      revenueByMonth,
      revenueByType,
      averageVisitCost: medicalRecords.length ? (totalRevenue / medicalRecords.length).toFixed(2) : 0
    }
  }

  const exportReport = () => {
    const data = reportType === 'overview' ? generateOverviewReport() : 
                 reportType === 'vaccination' ? generateVaccinationReport() : 
                 generateFinancialReport()
    
    const jsonData = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `petpals-${reportType}-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const overviewData = generateOverviewReport()
  const vaccinationData = generateVaccinationReport()
  const financialData = generateFinancialReport()

  return (
    <div className="reports">
      <div className="section-header">
        <h2>Reports & Analytics</h2>
        <div className="report-controls">
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
            className="report-select"
          >
            <option value="overview">Overview Report</option>
            <option value="vaccination">Vaccination Report</option>
            <option value="financial">Financial Report</option>
          </select>
          <button onClick={exportReport} className="export-btn">
            Export Report
          </button>
        </div>
      </div>

      {reportType === 'overview' && (
        <div className="report-content">
          <div className="report-stats">
            <div className="stat-card">
              <h3>General Statistics</h3>
              <div className="stat-grid">
                <div className="stat-item">
                  <span className="stat-number">{overviewData.totalPets}</span>
                  <span className="stat-label">Total Pets</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{overviewData.vaccinationRate}%</span>
                  <span className="stat-label">Vaccination Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{overviewData.consultationRate}%</span>
                  <span className="stat-label">Consultation Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{overviewData.totalAppointments}</span>
                  <span className="stat-label">Total Appointments</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <h3>Species Breakdown</h3>
              <div className="species-chart">
                {Object.entries(overviewData.speciesBreakdown).map(([species, count]) => (
                  <div key={species} className="species-item">
                    <span className="species-name">{species}</span>
                    <div className="species-bar">
                      <div 
                        className="species-fill" 
                        style={{ width: `${(count / overviewData.totalPets) * 100}%` }}
                      ></div>
                    </div>
                    <span className="species-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {reportType === 'vaccination' && (
        <div className="report-content">
          <div className="vaccination-stats">
            <div className="stat-card">
              <h3>Vaccination Status</h3>
              <div className="vaccination-breakdown">
                <div className="vaccination-item vaccinated">
                  <span className="count">{vaccinationData.vaccinated.length}</span>
                  <span className="label">Vaccinated</span>
                </div>
                <div className="vaccination-item not-vaccinated">
                  <span className="count">{vaccinationData.notVaccinated.length}</span>
                  <span className="label">Not Vaccinated</span>
                </div>
                <div className="vaccination-item upcoming">
                  <span className="count">{vaccinationData.upcomingVaccinations.length}</span>
                  <span className="label">Due Soon</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <h3>Pets Needing Vaccination</h3>
              <div className="pets-list">
                {vaccinationData.notVaccinated.length === 0 ? (
                  <p className="no-data">All pets are vaccinated!</p>
                ) : (
                  vaccinationData.notVaccinated.map(pet => (
                    <div key={pet.id} className="pet-item">
                      <span className="pet-name">{pet.name}</span>
                      <span className="pet-owner">{pet.owner}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {reportType === 'financial' && (
        <div className="report-content">
          <div className="financial-stats">
            <div className="stat-card">
              <h3>Financial Overview</h3>
              <div className="financial-summary">
                <div className="financial-item">
                  <span className="amount">₹{financialData.totalRevenue.toFixed(2)}</span>
                  <span className="label">Total Revenue</span>
                </div>
                <div className="financial-item">
                  <span className="amount">₹{financialData.averageVisitCost}</span>
                  <span className="label">Average Visit Cost</span>
                </div>
                <div className="financial-item">
                  <span className="amount">{medicalRecords.length}</span>
                  <span className="label">Total Visits</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <h3>Revenue by Service Type</h3>
              <div className="revenue-breakdown">
                {Object.entries(financialData.revenueByType).map(([type, revenue]) => (
                  <div key={type} className="revenue-item">
                    <span className="service-type">{type}</span>
                    <span className="service-revenue">₹{revenue.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports