function imagesFetch(nameImage, page) {
  const KEY = 'key=24217410-030407998cebbbeb7658c8c03';
  const GENERAL_LINK = 'https://pixabay.com/api/';

  return fetch(
    `${GENERAL_LINK}?&q=${nameImage}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Картинка с таким адресом отсутствует'));
  });
}
const api = {
  imagesFetch,
};

export default api;
