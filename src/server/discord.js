import dotenv from "dotenv";

dotenv.config();

const discord_webhook = process.env.DISCORD_WEBHOOK;

const discord = {
    send: (message) => {
        fetch(discord_webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: message.message,
                username: message.name,
            }),
        });
        // .then((response) => {
        //     if (response.ok) console.log("Message sent successfully!");
        //     else console.error("Failed to send message:", response.statusText);
        // });
    },
};

export default discord;
