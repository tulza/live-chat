import ChatRoom from "@/components/ChatRoom";
import ChatSocket from "@/components/ChatSocket";

export default function Home() {
    return (
        <ChatSocket>
            <ChatRoom />
        </ChatSocket>
    );
}
