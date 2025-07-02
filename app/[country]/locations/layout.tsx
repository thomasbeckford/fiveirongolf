export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ location: string }>;
}) => {
  const { location } = await params;
  return {
    title: `Five Iron Golf - ${location}`,
    description: `Find locations of Five Iron Golf`,
  };
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
