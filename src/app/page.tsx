import ChatRoom from "@/components/ChatRoom";
import ChatSocket from "@/context/ChatSocket";

export default function HomePage() {
    return (
        <ChatSocket>
            <ChatRoom />
        </ChatSocket>
    );
}
