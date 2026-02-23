import ParentsSectionLayout from '@/components/parents/ParentsSectionLayout';
import MessagesList from '@/components/parents/MessagesList';

export default function ParentsMessagesPage() {
  return (
    <>
      <ParentsSectionLayout active="messages">
        <MessagesList />
      </ParentsSectionLayout>
    </>
  );
}
