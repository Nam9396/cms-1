
const createSlug = (title) => {
  
  const sanitizedTitle = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');

  const slug = sanitizedTitle
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')

  return slug;
}

const createSERPtitle = (title) => { 
  return title + " | bacsichobeyeu";
}

const createPostURL = (title) => {
  const slug = createSlug(title);
  return "https://bacsichobeyeu.com/posts/" + slug;
}

export {
  createSlug, 
  createSERPtitle, 
  createPostURL
}