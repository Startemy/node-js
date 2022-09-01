
export const innDir = (intro) => {
  fetch('/', {
    method: "POST",
    body: JSON.stringify(intro),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(result => {
      const ul = document.querySelector('ul')
      result.map((file) => {
        ul.insertAdjacentHTML('beforeend', `<li><a href = "/${file}">${file}</a></li>`);
      })
    })
}

export const get = (subIntro) => {
  fetch(subIntro.dir)
    .then((response) => {
      return response.json();
    })
}

export const innSubDir = (subIntro) => {
  fetch(subIntro.dir, {
    method: "POST",
    body: JSON.stringify(subIntro),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(result => {
      const ul = document.querySelector('ul')
      result.map((file) => {
        ul.insertAdjacentHTML('beforeend', `<li><a href = "/${file}">${file}</a></li>`);
      })
    })
}
