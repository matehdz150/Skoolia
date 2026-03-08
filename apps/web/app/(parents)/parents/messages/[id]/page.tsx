import MessageConversation from '@/components/parents/MessageConversation';

export default async function ParentsMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MessageConversation schoolId={id} />;
}
