import ChatRoom from "@/components/ChatRoom";
import ChatSocket from "@/context/ChatSocket";

export default function Home() {
    return (
        <ChatSocket>
            <ChatRoom />
        </ChatSocket>
    );
}
