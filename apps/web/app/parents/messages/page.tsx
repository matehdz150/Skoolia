import ParentsCompactSidebar from '@/components/parents/ParentsCompactSidebar';
import MessagesList from '@/components/parents/MessagesList';

export default function ParentsMessagesPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[96px_1fr]">
          <ParentsCompactSidebar active="messages" />
          <MessagesList />
        </div>
      </main>
    </>
  );
}
