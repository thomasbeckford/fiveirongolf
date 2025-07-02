import DOMPurify from "isomorphic-dompurify";

const domain = process.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2/`;

export const getPageInfo = async (slug: string) => {
  const response = await fetch(`${apiUrl}pages?slug=${slug}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const [data] = await response.json();

  const {
    title: { rendered: title },
    content: { rendered: content },
  } = data;

  const sanitizedContent = DOMPurify.sanitize(content);

  return { title, content: sanitizedContent };
};

export const getLatestPosts = async ({
  perPage = 10,
}: {
  perPage?: number;
}) => {
  const response = await fetch(`${apiUrl}posts?per_page=${perPage}&_embed`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const results = await response.json();
  if (!results) {
    throw new Error(`No results found`);
  }

  const posts = results.map(
    (post: {
      title: {
        rendered: string;
      };
      content: {
        rendered: string;
      };
      excerpt: {
        rendered: string;
      };
      slug: string;
      date: string;
      featured_media: string;
    }) => {
      const {
        title: { rendered: title },
        content: { rendered: content },
        excerpt: { rendered: excerpt },
        slug,
        date,
        featured_media,
      } = post;

      const sanitizedContent = DOMPurify.sanitize(content);

      return {
        title,
        content: sanitizedContent,
        excerpt,
        slug,
        date,
        featured_media,
      };
    }
  );

  return posts;
};

export const getPostInfo = async ({ slug }: { slug: string }) => {
  const response = await fetch(`${apiUrl}posts?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const results = await response.json();

  if (!results) {
    throw new Error(`No results found`);
  }

  console.log("Results", results);

  const {
    title: { rendered: title },
    content: { rendered: content },
    excerpt: { rendered: excerpt },
    date,
    featured_media,
  } = results[0];

  const sanitizedContent = DOMPurify.sanitize(content);

  return {
    title,
    content: sanitizedContent,
    excerpt,
    date,
    featured_media,
  };
};
