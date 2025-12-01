import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev` 
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/workouts/`;
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        
        console.log('Processed workouts data:', workoutsData);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4 text-danger">💪 Workouts</h1>
          <p className="lead text-muted">Browse and manage workout routines</p>
          <button className="btn btn-danger">+ Create Workout</button>
        </div>
      </div>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info">
          <h4 className="alert-heading">No Workouts Available</h4>
          <p>No workout routines have been created yet. <button className="btn btn-link p-0 alert-link" style={{fontSize: 'inherit'}}>Create your first workout</button>.</p>
        </div>
      ) : (
        <>
          <div className="card mb-4">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">💪 Available Workouts ({workouts.length} total)</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Workout Name</th>
                      <th scope="col">Difficulty</th>
                      <th scope="col">Level</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout, index) => {
                      const difficultyConfig = {
                        "Easy": { badge: "bg-success", icon: "🟢", level: "Beginner" },
                        "Medium": { badge: "bg-warning", icon: "🟡", level: "Intermediate" },
                        "Hard": { badge: "bg-danger", icon: "🔴", level: "Advanced" }
                      };
                      const config = difficultyConfig[workout.difficulty] || { badge: "bg-secondary", icon: "⚪", level: "Unknown" };
                      
                      return (
                        <tr key={workout._id || workout.id || index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <strong className="text-danger">{workout.name}</strong>
                          </td>
                          <td>
                            <span className={`badge ${config.badge} fs-6`}>
                              {config.icon} {workout.difficulty}
                            </span>
                          </td>
                          <td>{config.level}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-success me-2">Start</button>
                            <button className="btn btn-sm btn-outline-primary me-2">Details</button>
                            <button className="btn btn-sm btn-outline-warning">Edit</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="row">
            {workouts.map((workout, index) => {
              const difficultyConfig = {
                "Easy": { badge: "bg-success", icon: "🟢", color: "success" },
                "Medium": { badge: "bg-warning text-dark", icon: "🟡", color: "warning" },
                "Hard": { badge: "bg-danger", icon: "🔴", color: "danger" }
              };
              const config = difficultyConfig[workout.difficulty] || { badge: "bg-secondary", icon: "⚪", color: "secondary" };
              
              return (
                <div key={workout._id || workout.id || index} className="col-md-6 col-lg-4 mb-3">
                  <div className={`card h-100 border-${config.color} shadow-sm`}>
                    <div className={`card-header bg-${config.color} text-white`}>
                      <h6 className="mb-0">💪 {workout.name}</h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <span className={`badge ${config.badge} fs-6`}>
                          {config.icon} {workout.difficulty}
                        </span>
                      </div>
                      <div className="d-grid gap-2">
                        <button className="btn btn-success btn-sm">🚀 Start Workout</button>
                        <button className="btn btn-outline-primary btn-sm">📋 View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Workouts;