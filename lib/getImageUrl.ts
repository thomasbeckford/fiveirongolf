export const getImageUrl = (image: any): string => {
  console.log('image', image);
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && image.url) return image.url;
  return '';
};
