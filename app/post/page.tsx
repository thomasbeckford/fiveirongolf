import { getPostInfo } from "@/lib/wp";

export default async function Post({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post } = await params;
  const { title, content } = await getPostInfo({ slug: post });
  return (
    <article className="prose max-w-2xl mx-auto py-20">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
