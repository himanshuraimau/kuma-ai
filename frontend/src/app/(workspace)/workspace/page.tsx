import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/api/session";
import { ChatWorkspace } from "@/components/workspace/ChatWorkspace";

export default async function WorkspacePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <ChatWorkspace userEmail={session.user.email} />;
}
