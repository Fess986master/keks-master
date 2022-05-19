const SERVER_URL = 'https://24.javascript.pages.academy/keksobooking';

const sendData = async (body) => {
  const response = await fetch(`${SERVER_URL}`, {
    method: 'POST',
    body: body,
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

const getData = async () => {
  let response = await fetch(`${SERVER_URL}/data`);
  if (response.ok) {
    let json = response.json();
    return json;
  } else {
    alert('Ошибка HTTP' + response.status);
  }
}

export {getData, sendData}
