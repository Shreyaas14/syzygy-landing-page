import MarkdownViewer from '@/app/components/MarkdownViewer';

export default function LibraryEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params; 
  return <MarkdownViewer slug={slug} />;
}
