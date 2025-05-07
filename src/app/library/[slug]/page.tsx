import MarkdownViewer from '@/app/components/MarkdownViewer';

export default async function LibraryEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return <MarkdownViewer slug={slug} />;
}
