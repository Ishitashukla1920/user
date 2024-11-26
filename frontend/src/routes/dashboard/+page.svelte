<script>
    // Simulated user activity data
    let activities = [
      { action: 'Signup', date: '2024-11-20', ip: '192.168.0.1' },
      { action: 'Login', date: '2024-11-21', ip: '192.168.0.2' },
      { action: 'Profile Update', date: '2024-11-22', ip: '192.168.0.3' },
    ];
  </script>
  
  <h1>Dashboard</h1>
  <table>
    <thead>
      <tr>
        <th>Action</th>
        <th>Date</th>
        <th>IP Address</th>
      </tr>
    </thead>
    <tbody>
      {#each activities as activity}
        <tr>
          <td>{activity.action}</td>
          <td>{activity.date}</td>
          <td>{activity.ip}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <!-- Link back to homepage -->
  <a href="/">Back to Home</a>
  