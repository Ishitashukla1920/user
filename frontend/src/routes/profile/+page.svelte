<script>
    // Mock user data
    let user = {
        name: 'Ectaaa',
        profilePic: 'https://via.placeholder.com/100', // Replace with actual profile picture URL
    };

    // Mock activity data
    let activities = [
        { action: 'Sign-up', ip: '192.168.1.1', time: '08:00 AM, 2024-11-20' },
        { action: 'Login', ip: '192.168.1.2', time: '09:00 AM, 2024-11-26' },
        { action: 'Password Change', ip: '192.168.1.3', time: '10:30 AM, 2024-11-26' },
        { action: 'Logout', ip: '192.168.1.4', time: '11:00 AM, 2024-11-26' },
    ];

    // Handlers for navigation
    /**
     * @param {string} tab
     */
    function handleNavClick(tab) {
        alert(`Navigated to ${tab}`);
    }

    function handleEditProfile() {
        alert('Navigating to Edit Profile...');
        // Logic to navigate to the edit profile page can be added here
    }

    function handleLogout() {
        alert('Logging out...');
        // Logic for logging out the user can be added here
    }
</script>

<style>
    @import './profile.css'; /* External CSS file for styles */

    .dashboard {
        display: flex;
        font-family: Arial, sans-serif;
    }

    .site-nav {
        width: 250px;
        background: #333;
        color: white;
        padding: 1rem;
    }

    .site-nav .name {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    .site-nav svg {
        margin-left: 0.5rem;
    }

    .site-nav ul {
        list-style: none;
        padding: 0;
    }

    .site-nav li {
        padding: 0.5rem 0;
        cursor: pointer;
    }

    .site-nav li.active,
    .site-nav li:hover {
        color: #ff6347;
    }

    .site-nav .note {
        margin-top: 2rem;
        font-size: 0.875rem;
    }

    main {
        flex: 1;
        padding: 1rem;
        background: #f8f9fa;
    }

    .nav-tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .nav-tabs a {
        text-decoration: none;
        color: #333;
        padding: 0.5rem 1rem;
        background: white;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .nav-tabs a.active {
        background: #007bff;
        color: white;
        border-color: #007bff;
    }

    .activity-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    .activity-table th,
    .activity-table td {
        border: 1px solid #ddd;
        padding: 0.5rem;
        text-align: left;
    }

    .activity-table th {
        background: #f1f1f1;
    }
</style>

<div class="dashboard">
    <!-- Navigation Sidebar -->
    <nav class="site-nav">
        <div class="name">
            {user.name}
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M11.5,22C11.64,22 11.77,22 11.9,21.96C12.55,21.82 13.09,21.38 13.34,20.78C13.44,20.54 13.5,20.27 13.5,20H9.5A2,2 0 0,0 11.5,22M18,10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18L18,16M19.97,10H21.97C21.82,6.79 20.24,3.97 17.85,2.15L16.42,3.58C18.46,5 19.82,7.35 19.97,10M6.58,3.58L5.15,2.15C2.76,3.97 1.18,6.79 1,10H3C3.18,7.35 4.54,5 6.58,3.58Z"></path>
            </svg>
        </div>
        <ul>
            <li on:click={handleEditProfile}>Edit Profile</li>
            <li on:click={() => handleNavClick('Settings')}>Settings</li>
            <li on:click={() => handleNavClick('Help')}>Help</li>
            <li on:click={handleLogout}>Logout</li>
        </ul>
        <div class="note">
            <h3>Your Monthly Report</h3>
            <p>Get the info about all your deals, pros, cons. And build your roadmap.</p>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        <header>
            <div class="breadcrumbs">
                <a href="#0/">Home</a>
            </div>
            <h1 class="title">Activity Dashboard</h1>
        </header>

        <!-- Activity Table -->
        <table class="activity-table">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>IP Address</th>
                    <th>Date & Time</th>
                </tr>
            </thead>
            <tbody>
                {#each activities as { action, ip, time }}
                    <tr>
                        <td>{action}</td>
                        <td>{ip}</td>
                        <td>{time}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </main>
</div>
