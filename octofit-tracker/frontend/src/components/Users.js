import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev` 
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/users/`;
        
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        
        console.log('Processed users data:', usersData);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4 text-info">👤 Users</h1>
          <p className="lead text-muted">Manage user profiles and superhero status</p>
          <button className="btn btn-info">+ Add New User</button>
        </div>
      </div>
      
      {users.length === 0 ? (
        <div className="alert alert-info">
          <h4 className="alert-heading">No Users Found</h4>
          <p>No users have been registered yet. <button className="btn btn-link p-0 alert-link" style={{fontSize: 'inherit'}}>Add the first user</button>.</p>
        </div>
      ) : (
        <>
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">👤 All Users ({users.length} total)</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Team</th>
                      <th scope="col">Superhero</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id || user.id || index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <strong className="text-primary">{user.name}</strong>
                        </td>
                        <td>
                          <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                        </td>
                        <td>
                          <span className="badge bg-secondary">{user.team}</span>
                        </td>
                        <td>
                          {user.is_superhero ? (
                            <span className="badge bg-success">🦸 Yes</span>
                          ) : (
                            <span className="badge bg-light text-dark">👤 No</span>
                          )}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">Profile</button>
                          <button className="btn btn-sm btn-outline-warning me-2">Edit</button>
                          <button className="btn btn-sm btn-outline-danger">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="row">
            {users.map((user, index) => (
              <div key={user._id || user.id || index} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 text-info">{user.name}</h6>
                    {user.is_superhero && <span className="badge bg-warning">🦸 Hero</span>}
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <small className="text-muted">📧 {user.email}</small><br />
                      <small className="text-muted">👥 Team: {user.team}</small>
                    </p>
                    <div className="d-grid gap-2">
                      <button className="btn btn-info btn-sm">View Profile</button>
                      <button className="btn btn-outline-secondary btn-sm">Send Message</button>
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

export default Users;