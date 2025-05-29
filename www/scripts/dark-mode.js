document.addEventListener('DOMContentLoaded', function() {
    const cookieValue = getCookie('darkMode');
    if (cookieValue === 'true') {
        toggleDarkMode();
    } else if (cookieValue === '') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toggleDarkMode();
        }
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        setDarkMode();
    } else {
        setLightMode();
    }
});

function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('darkmode-icon');
    const isDarkMode = body.getAttribute('data-bs-theme') === 'dark';
    body.setAttribute('data-bs-theme', isDarkMode ? 'light' : 'dark');
    setCookie('darkMode', isDarkMode ? 'false' : 'true', 30);
    if (isDarkMode) {
        icon.src = '/icons/moon-stars-fill.svg';
        icon.alt = 'Dark Mode Icon';
    } else {
        icon.src = '/icons/sun-fill.svg';
        icon.alt = 'Light Mode Icon';
    }
}

function setDarkMode() {
    const body = document.body;
    const icon = document.getElementById('darkmode-icon');
    body.setAttribute('data-bs-theme', 'dark');
    setCookie('darkMode', 'true', 30);
    icon.src = '/icons/sun-fill.svg';
    icon.alt = 'Light Mode Icon';
}
function setLightMode() {
    const body = document.body;
    const icon = document.getElementById('darkmode-icon');
    body.setAttribute('data-bs-theme', 'light');
    setCookie('darkMode', 'false', 30);
    icon.src = '/icons/moon-stars-fill.svg';
    icon.alt = 'Dark Mode Icon';
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}