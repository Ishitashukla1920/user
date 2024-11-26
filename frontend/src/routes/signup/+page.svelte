<script lang="ts">
    // Import FontAwesome for icons
    import '@fortawesome/fontawesome-free/css/all.min.css';

   
    let name = '';
let email = '';
let password = '';
let confirmPassword = '';
let errorMessage = '';
let successMessage = '';

// Signup function
const signup = async () => {
  // Reset messages
  errorMessage = '';
  successMessage = '';

  // Validate input
  if (!name.trim() || !email.trim() || !password || !confirmPassword) {
    errorMessage = "All fields are required.";
    return;
  }

  if (password !== confirmPassword) {
    errorMessage = "Passwords do not match!";
    return;
  }

  const userData = { name, email, password , confirmPassword};

  try {
    // Send signup request to the backend
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok) {
      successMessage = result.message || "Signup successful!";
      errorMessage = ''; // Clear previous error
      // Optionally clear form fields after a successful signup
      name = '';
      email = '';
      password = '';
      confirmPassword = '';
    } else {
      errorMessage = result.error || "Signup failed.";
      successMessage = ''; // Clear previous success
    }
  } catch (error) {
    errorMessage = "An error occurred while signing up. Please try again later.";
    successMessage = ''; // Clear previous success
    console.error("Signup Error:", error); // Debugging
  }
};

// Handle form submission
const handleSignup = async (event:Event) => {
  event.preventDefault(); // Prevent form from reloading the page
  alert("Form submitted"); 
  await signup(); // Call the signup function
};


</script>

<style>
  @import './signup.css'; /* Import your custom CSS file for the signup page */
</style>

<div class="container">
  <div class="screen">
    <div class="screen__content">
      <!-- Signup Form -->
        <form class="signup" on:submit|preventDefault={handleSignup}>
        <div class="signup__field">
          <i class="signup__icon fas fa-user"></i>
          <input 
            type="text" 
            bind:value={name} 
            class="signup__input" 
            placeholder="Full Name" 
            required 
          />
        </div>
        <div class="signup__field">
          <i class="signup__icon fas fa-envelope"></i>
          <input 
            type="email" 
            bind:value={email} 
            class="signup__input" 
            placeholder="Email" 
            required 
          />
        </div>
        <div class="signup__field">
          <i class="signup__icon fas fa-lock"></i>
          <input 
            type="password" 
            bind:value={password} 
            class="signup__input" 
            placeholder="Password" 
            required 
          />
        </div>
        <div class="signup__field">
          <i class="signup__icon fas fa-lock"></i>
          <input 
            type="password" 
            bind:value={confirmPassword} 
            class="signup__input" 
            placeholder="Confirm Password" 
            required 
          />
        </div>
        <button type="submit" class="button signup__submit">
          <span class="button__text">Sign Up Now</span>
          <i class="button__icon fas fa-chevron-right"></i>
        </button>
      </form>

      <!-- Social Signup -->
      <div class="social-signup">
        <h3>Sign up via</h3>
        <div class="social-icons">
          <a href="https://instagram.com" class="social-signup__icon fab fa-instagram" aria-label="Sign up via Instagram"></a>
          <a href="https://facebook.com" class="social-signup__icon fab fa-facebook" aria-label="Sign up via Facebook"></a>
          <a href="https://twitter.com" class="social-signup__icon fab fa-twitter" aria-label="Sign up via Twitter"></a>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="screen__background">
      <span class="screen__background__shape screen__background__shape4"></span>
      <span class="screen__background__shape screen__background__shape3"></span>
      <span class="screen__background__shape screen__background__shape2"></span>
      <span class="screen__background__shape screen__background__shape1"></span>
    </div>
  </div>
</div>
