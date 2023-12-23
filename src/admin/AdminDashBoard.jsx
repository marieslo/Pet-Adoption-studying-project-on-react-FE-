import React from 'react'

export default function AdminDashBoard() {
    const users = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ];
    
      const pets = [
        { id: 1, name: 'Pet 1', owner: 'User 1' },
        { id: 2, name: 'Pet 2', owner: 'User 2' },
      ];
    
      return (
        <div>
          <h1>Dashboard</h1>
          <div>
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          <div>
            <h2>Pets</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.id}>
                    <td>{pet.id}</td>
                    <td>{pet.name}</td>
                    <td>{pet.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }