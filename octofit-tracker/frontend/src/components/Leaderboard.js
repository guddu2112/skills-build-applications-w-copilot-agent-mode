import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev` 
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/leaderboard/`;
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        
        console.log('Processed leaderboard data:', leaderboardData);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4 text-warning">🏆 Leaderboard</h1>
          <p className="lead text-muted">Team rankings and competition standings</p>
        </div>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="alert alert-info">
          <h4 className="alert-heading">No Leaderboard Data</h4>
          <p>No team rankings available yet.</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0">🏆 Team Rankings ({leaderboard.length} teams)</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Team</th>
                    <th scope="col">Points</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard
                    .sort((a, b) => b.points - a.points)
                    .map((entry, index) => {
                      const rankClass = index === 0 ? "text-warning" : index === 1 ? "text-secondary" : index === 2 ? "text-warning" : "";
                      const rankIcon = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";
                      return (
                        <tr key={entry._id || entry.id || index} className={index < 3 ? "table-success" : ""}>
                          <th scope="row" className={rankClass}>
                            {rankIcon} #{index + 1}
                          </th>
                          <td className="fw-bold">{entry.team}</td>
                          <td>
                            <span className="badge bg-primary fs-6">{entry.points} pts</span>
                          </td>
                          <td>
                            {index < 3 && <span className="badge bg-success">Top 3</span>}
                            {index >= 3 && <span className="badge bg-secondary">Competing</span>}
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-info me-2">Details</button>
                            <button className="btn btn-sm btn-outline-primary">View Team</button>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;