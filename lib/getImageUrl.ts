export const getImageUrl = (image: string | { url?: string | null } | null | undefined): string => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && typeof image.url === 'string') return image.url;
  return '';
};
