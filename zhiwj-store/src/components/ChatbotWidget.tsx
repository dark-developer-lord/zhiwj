"use client";

import { useEffect } from "react";

export default function ChatbotWidget() {
  useEffect(() => {
    // Chatbase / Jigarik Bot Integration
    // 1. Register at https://www.chatbase.co or https://jigarik.com
    // 2. Upload your knowledge base (PDF/TXT with brand info in RU/TJ/EN)
    // 3. Get your bot ID and replace 'YOUR_BOT_ID' below
    
    const script = document.createElement("script");
    script.id = "chatbase-bot";
    script.async = true;
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("id", "YOUR_BOT_ID"); // REPLACE WITH YOUR ACTUAL BOT ID
    script.setAttribute("domain", "www.chatbase.co");
    
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("chatbase-bot");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return null;
}
