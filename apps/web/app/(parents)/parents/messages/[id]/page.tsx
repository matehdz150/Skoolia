import ParentsNavbar from '@/components/layout/ParentsNavbar';
import ParentProfileHeader from '@/components/parents/ParentProfileHeader';
import ParentsSidebar from '@/components/parents/ParentsSidebar';
import MessageConversation from '@/components/parents/MessageConversation';

export default function ParentsMessageDetailPage() {
  return (
    <>
      <ParentsNavbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <ParentProfileHeader />
        <div className="mt-10 md:mt-12 grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
          <ParentsSidebar active="messages" />
          <MessageConversation />
        </div>
      </main>
    </>
  );
}
