// app/library/[slug]/page.tsx
import MarkdownViewer from '@/app/components/MarkdownViewer';

export default async function LibraryEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <MarkdownViewer slug={slug} />;
}
