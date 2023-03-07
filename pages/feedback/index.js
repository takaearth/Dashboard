//custom components
import FeedbackList from "./FeedbackList";
import Breadcrumb from "@/components/elements/Breadcrumb";
import { AuthGuard } from "@/components/elements/AuthGuard";

export default function FeedbackPage() {
  return (
    <AuthGuard>
      <main className="bg-gray-100 w-full min-h-screen max-h-screen overflow-y-scroll custom-scroll pt-20 px-6">
        <Breadcrumb routes={["Feedback"]} />
        <FeedbackList />
      </main>
    </AuthGuard>
  );
}
