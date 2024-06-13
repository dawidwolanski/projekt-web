import UserService from './Services/UserService';
import HeaderComponent from './Components/Header';
import './style.css';

const handleFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const login = (document.getElementById('form-username') as HTMLInputElement).value;
    const password = (document.getElementById('form-password') as HTMLInputElement).value;
    
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('Error:', data.message);
        return
    }

    if (data.isOk) {
        UserService.storeToken(data);
        console.log('Logged in successfully');
        window.location.href = '/';
        return;
    }
    
    const errorDiv = document.getElementById('login-error')!!;
    errorDiv.classList.remove('hide');
    errorDiv.textContent = 'Invalid login or password';
}


document.getElementById('login-form')?.addEventListener('submit', handleFormSubmit);

function onSignIn(googleUser: { getAuthResponse: () => { (): any; new(): any; id_token: any; }; }) {
    console.log('loguje');
      var id_token = googleUser.getAuthResponse().id_token;
      fetch('http://localhost:3000/auth/google', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: id_token })
      })
      .then(response => response.json())
      .then(data => {
          console.log('Logged in successfully:', data);
          // Store token in localStorage or do something with it
      })
      .catch(error => console.error('Error:', error));
  }


  new HeaderComponent().render(document.body)