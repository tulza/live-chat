import ChatRoom from "@/components/ChatRoom";
import ChatSocket from "@/context/ChatSocket";
import { getCurrentSession } from "@/libs/server/session";

export default async function HomePage() {
    const { user } = await getCurrentSession();
    return (
        <ChatSocket>
            <ChatRoom user={user} />
        </ChatSocket>
    );
}
