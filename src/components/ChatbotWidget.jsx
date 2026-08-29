import React, { useState } from "react";
import styled from "styled-components";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const apiUrl = (path) => (API_BASE_URL ? `${API_BASE_URL}${path}` : path);
const TOPICS = [
  { id: "periods", label: "Periods and health", answer: "Every body is different. Periods can vary in timing, flow and symptoms. For personal medical advice, severe pain, unusually heavy bleeding, pregnancy concerns or urgent symptoms, contact a qualified healthcare professional.", links: [{ label: "Menstrual health guide", url: "/Guidetomenstrualhealth" }] },
  { id: "products", label: "Menstrual products", answer: "Pads, tampons, menstrual cups and reusable cloth products can all be suitable choices. The best option depends on comfort, access, cost and correct hygienic use.", links: [{ label: "Explore menstrual products", url: "/Menstrualproducts" }] },
  { id: "programmes", label: "Our programmes", answer: "Swampurna works to improve menstrual health awareness, education and access. Explore our initiatives and community impact stories.", links: [{ label: "Our initiatives", url: "/Programinitiative" }, { label: "Impact stories", url: "/Impactstories" }] },
  { id: "join", label: "Get involved", answer: "You can join the movement, volunteer, support a partnership or take part in current activities through the website.", links: [{ label: "Join the movement", url: "/Joinmovement" }] },
];
const MATCHES = [
  { id: "periods", words: ["period", "late", "cramp", "pain", "bleeding", "pms", "cycle"] },
  { id: "products", words: ["pad", "tampon", "cup", "cloth", "product", "hygiene"] },
  { id: "programmes", words: ["programme", "program", "initiative", "impact", "project"] },
  { id: "join", words: ["join", "volunteer", "participate", "donate", "partner", "internship"] },
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: "welcome", role: "assistant", label: "SWAMPURNA ASSISTANT", text: "Hi! Ask me about Swampurna, menstrual health education, products, programmes, volunteering, or support." }]);
  const [question, setQuestion] = useState("");
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [showConsent, setShowConsent] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const addMessage = (message) => setMessages((items) => [...items, { id: `${Date.now()}-${Math.random()}`, ...message }]);
  const localAnswer = (text) => {
    const match = MATCHES.find((item) => item.words.some((word) => text.toLowerCase().includes(word)));
    return match ? TOPICS.find((topic) => topic.id === match.id) : null;
  };
  const askAi = async (text) => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/v1/chat/answer"), { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: text, consent: true }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The AI assistant is unavailable right now.");
      addMessage({ role: "assistant", label: "AI ANSWER", text: data.answer, links: data.sources || [] });
    } catch (error) {
      addMessage({ role: "assistant", label: "SUPPORT", text: error.message || "The AI assistant is unavailable right now.", links: [{ label: "Contact support", url: "/Contactus" }], error: true });
    } finally { setLoading(false); }
  };
  const sendQuestion = (event, supplied = "") => {
    event?.preventDefault();
    const text = String(supplied || question).trim();
    if (!text || loading) return;
    addMessage({ role: "user", text });
    setQuestion("");
    const topic = localAnswer(text);
    if (topic) { addMessage({ role: "assistant", label: "FAQ ANSWER", text: topic.answer, links: topic.links }); return; }
    if (!aiConsent) { setPendingQuestion(text); setShowConsent(true); return; }
    askAi(text);
  };
  const approveAi = () => { const text = pendingQuestion; setPendingQuestion(""); setShowConsent(false); setAiConsent(true); askAi(text); };

  return <Wrap>
    {open && <section id="swampurna-help" className="panel" aria-label="Swampurna AI chat">
      <header><div><span>SWAMPURNA HELP</span><h2>Chat with Swampurna</h2><p>Website answers and guided support</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Close chat">x</button></header>
      <div className="messages" aria-live="polite">
        {messages.map((message) => <article key={message.id} className={`message ${message.role} ${message.error ? "error" : ""}`}>
          {message.role === "assistant" && <small>{message.label}</small>}<p>{message.text}</p>
          {message.links?.length > 0 && <div className="links">{message.links.map((link) => <a key={link.url} href={link.url}>{link.label}</a>)}</div>}
        </article>)}
        {loading && <article className="message assistant typing"><i></i><i></i><i></i></article>}
        {showConsent && <article className="consent"><strong>Before I use AI</strong><p>Your question will be sent to Swampurna's AI provider to create a website-content answer. It will not be stored in our database. Do not include personal, medical-record, password, PIN, or payment information.</p><div><button type="button" onClick={approveAi}>I agree - ask AI</button><button type="button" className="cancel" onClick={() => { setShowConsent(false); setPendingQuestion(""); }}>Cancel</button></div></article>}
      </div>
      <div className="prompts"><button type="button" onClick={() => sendQuestion(null, "What is menstruation?")}>What is menstruation?</button><button type="button" onClick={() => sendQuestion(null, "How can I join?")}>How can I join?</button><button type="button" onClick={() => sendQuestion(null, "Tell me about menstrual products")}>Menstrual products</button></div>
      <form className="composer" onSubmit={sendQuestion}><label className="sr-only" htmlFor="chatbot-question">Ask Swampurna</label><input id="chatbot-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a website-related question..." maxLength={600} disabled={loading} /><button type="submit" disabled={loading || !question.trim()}>{loading ? "..." : "Send"}</button></form>
      <footer>FAQ answers are local. AI is only used after consent and answers only from approved Swampurna content. This chat is not stored in our database.</footer>
    </section>}
    <button className="launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="swampurna-help"><b>?</b><span>{open ? "Close chat" : "Chat with us"}</span></button>
  </Wrap>;
};

const Wrap = styled.div`
  position:fixed;right:22px;bottom:22px;z-index:1000;font-family:inherit;
  .launcher{display:inline-flex;align-items:center;gap:9px;border:0;border-radius:999px;padding:11px 17px 11px 11px;color:#fff;background:#0d77be;font-weight:700;box-shadow:0 12px 30px rgba(13,119,190,.3);cursor:pointer}.launcher b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#fff;color:#0d77be;font-size:17px}
  .panel{position:absolute;right:0;bottom:58px;display:flex;flex-direction:column;width:min(410px,calc(100vw - 28px));height:min(640px,calc(100vh - 105px));overflow:hidden;border:1px solid #dbe7f0;border-radius:18px;background:#fff;box-shadow:0 20px 55px rgba(14,44,72,.22)}header{display:flex;justify-content:space-between;gap:16px;padding:18px 20px;color:#fff;background:linear-gradient(135deg,#075985,#0d77be)}header span{display:block;font-size:10px;font-weight:800;letter-spacing:.12em;opacity:.8}h2{margin:3px 0 2px;font-size:20px;color:inherit}header p{margin:0;font-size:12px;opacity:.86}header button{width:30px;height:30px;border:0;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;font-size:20px;cursor:pointer}
  .messages{flex:1;overflow-y:auto;padding:16px;background:#f8fbfd}.message{width:fit-content;max-width:89%;margin-bottom:12px;padding:11px 13px;border-radius:14px;font-size:14px;line-height:1.55}.message p{margin:0}.message.assistant{border:1px solid #d9e9f2;border-top-left-radius:4px;background:#fff;color:#193b54}.message.user{margin-left:auto;border-bottom-right-radius:4px;background:#0d77be;color:#fff}.message.error{border-color:#fed7aa;background:#fff7ed;color:#9a3412}.message small{display:block;margin-bottom:5px;color:#15803d;font-size:10px;font-weight:800;letter-spacing:.1em}.message.error small{color:#c2410c}.links{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}.links a{padding:4px 7px;border-radius:6px;background:#e8f5fc;color:#075985;font-size:11px;font-weight:700;text-decoration:none}.typing{display:flex;gap:4px;align-items:center;min-width:48px}.typing i{width:6px;height:6px;border-radius:50%;background:#75a7c4;animation:pulse 1.1s infinite}.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}@keyframes pulse{50%{opacity:.3;transform:translateY(-2px)}}
  .consent{margin:2px 0 12px;padding:12px;border-radius:12px;background:#e8f6fc;color:#173f5c;font-size:12px;line-height:1.5}.consent p{margin:5px 0 10px}.consent div{display:flex;gap:8px}.consent button{border:0;border-radius:8px;padding:8px 10px;background:#0d77be;color:#fff;font-weight:700;cursor:pointer}.consent button.cancel{background:#e2e8f0;color:#334155}
  .prompts{display:flex;gap:6px;overflow-x:auto;padding:8px 12px;border-top:1px solid #e5eef4;background:#fff}.prompts button{flex:0 0 auto;border:1px solid #cfe3ef;border-radius:999px;padding:6px 9px;background:#fff;color:#075985;font-size:11px;font-weight:700;cursor:pointer}.composer{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e5eef4;background:#fff}.composer input{min-width:0;flex:1;border:1px solid #cbd9e3;border-radius:10px;padding:10px;color:#15334a;font:inherit;font-size:13px}.composer input:focus{border-color:#0d77be;outline:2px solid rgba(13,119,190,.15)}.composer button{border:0;border-radius:10px;padding:0 13px;background:#0d77be;color:#fff;font-weight:700;cursor:pointer}.composer button:disabled{opacity:.55;cursor:not-allowed}footer{padding:8px 12px;color:#64748b;background:#fbfdff;font-size:10px;line-height:1.35}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:480px){right:14px;bottom:14px;.launcher span{display:none}.launcher{padding:10px}.panel{bottom:52px}}
`;
export default ChatbotWidget;