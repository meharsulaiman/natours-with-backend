/* eslint-disable */
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) {
    el.parentElement.removeChild(el);
  }
};

const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(() => {
    hideAlert();
  }, 5000);
};

const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        window.location.assign('/');
      }, 1500);
    }
    if (data.status === 'fail') {
      showAlert('error', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const logout = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/logout', {
      method: 'GET',
    });

    if (response.data.status === 'success') {
      location.reload(true);
    }
  } catch (error) {
    showAlert('error', 'Error loggging out! try again');
  }
};

const loginBtn = document.querySelector('.form');
if (loginBtn) {
  loginBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

const logOutBtn = document.querySelector('.nav__el--logout');
if (logOutBtn) {
  logOutBtn.addEventListener('click', (e) => {
    logout();
  });
}
