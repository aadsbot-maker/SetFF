fetch('phones.json')
  .then(response => response.json())
  .then(data => {
    const phonesList = document.getElementById('phones-list');
    const searchInput = document.getElementById('search');

    function displayPhones(filter = '') {
      phonesList.innerHTML = '';
      Object.keys(data)
        .filter(name => name.toLowerCase().includes(filter.toLowerCase()))
        .forEach(name => {
          const item = document.createElement('div');
          item.className = 'phone-item';
          item.innerHTML = `<strong>${name}</strong>`;

          const settingsDiv = document.createElement('div');
          settingsDiv.className = 'settings';
          const settings = data[name];
          for (const key in settings) {
            const row = document.createElement('div');
            row.className = 'setting-row';
            row.innerHTML = `<span>${key}</span><span>${settings[key]}</span>`;
            settingsDiv.appendChild(row);
          }
          item.appendChild(settingsDiv);
          item.addEventListener('click', () => {
            document.querySelectorAll('.settings').forEach(s => s.style.display = 'none');
            settingsDiv.style.display = 'block';
          });
          phonesList.appendChild(item);
        });
    }

    searchInput.addEventListener('input', () => displayPhones(searchInput.value));
    displayPhones();
  })
  .catch(err => console.error('Error loading JSON:', err));
