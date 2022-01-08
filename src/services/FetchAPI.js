function imagesFetch(nameImage, page) {
  const KEY = 'key=19055497-436f2f9143aedeb9fa32eebb3';
  const GENERAL_LINK = 'https://pixabay.com/api/';

  return fetch(
    `${GENERAL_LINK}?${KEY}&q=${nameImage}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(r => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error('Картинки с таким именем отсутсвуют'));
  });
}
const api = {
  imagesFetch,
};

export default api;
