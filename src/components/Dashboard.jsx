const Dashboard = ({ pets, appointments }) => {
  const today = new Date().toISOString().split('T')[0]
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
  
  const stats = {
    totalPets: pets.length,
    vaccinated: pets.filter(pet => pet.isVaccinated).length,
    consulted: pets.filter(pet => pet.isConsulted).length,
    todayAppointments: appointments.filter(apt => apt.date === today).length,
    upcomingVaccinations: pets.filter(pet => {
      if (!pet.nextVaccinationDate) return false
      return new Date(pet.nextVaccinationDate) <= thirtyDaysFromNow
    }).length,
    criticalAlerts: pets.filter(pet => 
      (!pet.isVaccinated) || 
      (pet.nextConsultDate && new Date(pet.nextConsultDate) < new Date())
    ).length
  }

  const recentActivity = [
    ...pets.slice(-3).map(pet => ({
      type: 'pet_added',
      message: `New pet ${pet.name} registered`,
      time: pet.createdAt,
      icon: '🐾'
    })),
    ...appointments.slice(-3).map(apt => ({
      type: 'appointment',
      message: `Appointment scheduled for ${apt.petName}`,
      time: apt.createdAt,
      icon: '📅'
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5)

  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.date) >= new Date() && apt.status !== 'completed')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard Overview</h2>
        <div className="date-info">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">🐾</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalPets}</div>
            <div className="stat-label">Total Pets</div>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">💉</div>
          <div className="stat-content">
            <div className="stat-number">{stats.vaccinated}</div>
            <div className="stat-label">Vaccinated</div>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">👨⚕️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.consulted}</div>
            <div className="stat-label">Consulted</div>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.todayAppointments}</div>
            <div className="stat-label">Today's Appointments</div>
          </div>
        </div>
        
        <div className="stat-card danger">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.criticalAlerts}</div>
            <div className="stat-label">Critical Alerts</div>
          </div>
        </div>
        
        <div className="stat-card secondary">
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <div className="stat-number">{stats.upcomingVaccinations}</div>
            <div className="stat-label">Upcoming Vaccinations</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>🔔 Critical Alerts</h3>
          <div className="alerts-list">
            {stats.criticalAlerts === 0 ? (
              <div className="no-alerts">✅ All pets are up to date!</div>
            ) : (
              pets.filter(pet => 
                (!pet.isVaccinated) || 
                (pet.nextConsultDate && new Date(pet.nextConsultDate) < new Date())
              ).map(pet => (
                <div key={pet.id} className="alert-item">
                  <span className="alert-icon">⚠️</span>
                  <div className="alert-content">
                    <strong>{pet.name}</strong>
                    <p>{!pet.isVaccinated ? 'Needs vaccination' : 'Overdue consultation'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>📅 Upcoming Appointments</h3>
          <div className="appointments-preview">
            {upcomingAppointments.length === 0 ? (
              <div className="no-data">No upcoming appointments</div>
            ) : (
              upcomingAppointments.map(apt => (
                <div key={apt.id} className="appointment-preview-item">
                  <div className="appointment-date">
                    {new Date(apt.date).toLocaleDateString()}
                  </div>
                  <div className="appointment-details">
                    <strong>{apt.petName}</strong>
                    <p>{apt.type} - {apt.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>📈 Recent Activity</h3>
          <div className="activity-feed">
            {recentActivity.length === 0 ? (
              <div className="no-data">No recent activity</div>
            ) : (
              recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-content">
                    <p>{activity.message}</p>
                    <small>{new Date(activity.time).toLocaleString()}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard