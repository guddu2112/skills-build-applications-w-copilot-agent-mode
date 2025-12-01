import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        // Build URL with codespace name - matches pattern: -8000.app.github.dev/api/teams
        const apiUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        
        console.log('Processed teams data:', teamsData);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4 text-success">👥 Teams</h1>
          <p className="lead text-muted">Manage and view all teams</p>
          <button className="btn btn-success">+ Add New Team</button>
        </div>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-info">
          <h4 className="alert-heading">No Teams Found</h4>
          <p>No teams have been created yet. <button className="btn btn-link p-0 alert-link" style={{fontSize: 'inherit'}}>Create the first team</button>.</p>
        </div>
      ) : (
        <>
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">👥 All Teams ({teams.length} total)</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Team Name</th>
                      <th scope="col">Team ID</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, index) => (
                      <tr key={team._id || team.id || index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <strong className="text-primary">{team.name}</strong>
                        </td>
                        <td>
                          <code className="text-muted">{team._id || team.id || 'N/A'}</code>
                        </td>
                        <td>
                          <span className="badge bg-success">Active</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-warning me-2">Edit</button>
                          <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="row">
            {teams.map((team, index) => (
              <div key={team._id || team.id || index} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-light">
                    <h5 className="card-title mb-0 text-success">{team.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">
                      <small>ID: {team._id || team.id || 'N/A'}</small>
                    </p>
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary btn-sm">View Details</button>
                      <button className="btn btn-outline-secondary btn-sm">Manage Members</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Teams;