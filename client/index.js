async function createDog() {
  const name = document.getElementById('name').value;
  const age = document.querySelector('#age').value;
  const breed = document.getElementById('breed').value;

  try {
    const response = await fetch('http://localhost:8080/dogs', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ name, age, breed }),
    });
    if (!response.ok) throw new Error('Response not ok', { cause: response });

    const json = await response.json();
    if (![200, 201].includes(json.status)) throw new Error(json.message);
  } catch (error) {
    alert(error.message);
  }
}

async function getDogs() {
  try {
    const res = await fetch('http://localhost:8080/dogs');
    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  getDogs().then((dogs) => {
    console.log({ dogs });
    const container = document.getElementById('dogs');

    for (let i = 0; i < dogs.length; i++) {
      const dog = dogs[i];

      const li = document.createElement('li');
      li.innerText = dog.name || 'No name specified';
      container.appendChild(li);
    }
  });
});
