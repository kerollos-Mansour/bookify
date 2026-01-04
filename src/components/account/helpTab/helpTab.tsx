import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Send,
  HelpCircle,
  Phone,
  Mail,
  Clock,
  User,
  Bot,
} from "lucide-react";
import { useToast } from "../../UI/ToastProvider/ToastProvider";
import { io, Socket } from "socket.io-client";
import { storage } from "../../../utils/storage";
import { useAuth } from "../../../context/authContext";

interface Message {
  _id?: string;
  id?: string;
  content: string;
  text?: string;
  senderId: string;
  receiverId?: string;
  createdAt?: string;
  read?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

const SUPPORT_AGENT_ID = "6949337c106a70a2a131bcbd";

export default function HelpTab() {
  const toast = useToast();
  const { user, token, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can we help you today?",
      senderId: SUPPORT_AGENT_ID,
      createdAt: new Date().toISOString(),
      read: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const faqs: FAQ[] = [
    {
      question: "How do I cancel my booking?",
      answer:
        "You can cancel your booking by going to 'My Trips' and selecting the booking you want to cancel. Please note that cancellation policies vary by property.",
    },
    {
      question: "When will I receive my refund?",
      answer:
        "Refunds are typically processed within 5-10 business days after cancellation, depending on your payment method and bank.",
    },
    {
      question: "How do I change my booking dates?",
      answer:
        "To modify your booking dates, go to 'My Trips', select your booking, and click 'Modify Booking'. Note that changes are subject to availability and may incur additional charges.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and PayPal.",
    },
  ];

  const currentUserId = user?.id || user?.id || "";

  // Initialize Socket.io connection
  useEffect(() => {
    if (!isAuthenticated || !token || !user) {
      console.log("Not authenticated, skipping socket connection");
      return;
    }
    console.log("🔌 Connecting to socket with user:", user);

    // Replace with your actual backend URL
    const newSocket = io("http://localhost:5000", {
      auth: {
        token: token,
      },
      reconnection: true,
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      toast.success("Connected to support chat");

      newSocket.emit("chat:join", { receiverId: SUPPORT_AGENT_ID });
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      toast.warning("Disconnected from support chat");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
      setIsConnected(false);

      if (
        error.message.includes("token") ||
        error.message.includes("Authentication")
      ) {
        toast.error("Authentication failed. Please log in again.");
      }
    });

    newSocket.on("chat:history", (history: Message[]) => {
      console.log("📜 Received chat history:", history);
      if (history.length > 0) {
        setMessages(history);
      }
    });

    newSocket.on("chat:message", (data: Message) => {
      console.log("📥 New message received:", data);

      setMessages((prev) => {
        // Avoid duplicates
        const exists = prev.some(
          (msg) =>
            msg._id === data._id ||
            (msg.content === data.content && msg.senderId === data.senderId)
        );
        if (exists) return prev;
        return [...prev, data];
      });

      setIsTyping(false);
    });

    newSocket.on(
      "chat:typing",
      ({ userId, isTyping: typing }: { userId: string; isTyping: boolean }) => {
        if (userId === SUPPORT_AGENT_ID) {
          setIsTyping(typing);
        }
      }
    );

    newSocket.on("chat:joined", ({ room }) => {
      console.log("✅ Joined room:", room);
    });

    setSocket(newSocket);

    return () => {
      newSocket.removeAllListeners();
      newSocket.close();
    };
  }, [isAuthenticated, token, user]);

  // Auto-scroll to bottom
  const scrollChatToBottom = () => {
    if (!chatContainerRef.current) return;

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [messages,isTyping]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    if (socket && isConnected) {
      socket.emit("chat:message", {
        receiverId: SUPPORT_AGENT_ID,
        content: inputMessage,
      });
    } else {
      // Fallback: simulate response when not connected
      const userMessage: Message = {
        id: Math.random().toString(36).substring(7),
        content: inputMessage,
        senderId: currentUserId,
        createdAt: new Date().toISOString(),
        read: true,
      };

      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const response: Message = {
          id: Math.random().toString(36).substring(7),
          content:
            "Thank you for your message. A support agent will respond shortly.",
          senderId: SUPPORT_AGENT_ID,
          createdAt: new Date().toISOString(),
          read: false,
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
    }

    setInputMessage("");
  };

  const handelInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);

    if (socket.emit && isConnected) {
      socket.emit("chat:typing", {
        receiverId: SUPPORT_AGENT_ID,
        isTyping: true,
      });
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (socket.emit && isConnected) {
        socket.emit("chat:typing", {
          receiverId: SUPPORT_AGENT_ID,
          isTyping: false,
        });
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const askFAQ = (faq: FAQ) => {
    const userMessage: Message = {
      id: Math.random().toString(36).substring(7),
      content: faq.question,
      senderId: currentUserId,
      createdAt: new Date().toISOString(),
      read: true,
    };

    const botResponse: Message = {
      id: Math.random().toString(36).substring(7),
      content: faq.answer,
      senderId: SUPPORT_AGENT_ID,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
  };

  const isOwnMessage = (message: Message): boolean => {
    const msgSenderId = String(message.senderId);
    const myId = String(currentUserId);
    return msgSenderId === myId;
  };

  // ✅ Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="bg-card rounded-3xl shadow-sm overflow-hidden p-8">
        <div className="text-center">
          <HelpCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Please Log In
          </h2>
          <p className="text-muted-foreground">
            You need to be logged in to access the support chat.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold">Help & Support</h2>
            <p className="text-teal-100 text-sm">We're here to help you 24/7</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Contact Us
            </h3>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Phone</p>
                  <p className="text-blue-600 text-sm">1-800-EXPEDIA</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Email</p>
                  <p className="text-purple-600 text-sm">support@expedia.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Hours</p>
                  <p className="text-green-600 text-sm">24/7 Support</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => askFAQ(faq)}
                    className="w-full text-left p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm text-foreground hover:text-foreground/80"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="lg:col-span-2">
            <div className="bg-muted rounded-2xl overflow-hidden border-2 border-input-border h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                  <div>
                    <h3 className="font-semibold text-white">Live Chat</h3>
                    <p className="text-teal-100 text-xs">
                      {isConnected ? "Connected" : "Connecting..."}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    isConnected ? "bg-green-400" : "bg-yellow-400"
                  } animate-pulse`}
                ></div>
              </div>

              {/* Messages */}
              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {messages.map((message, idx) => {
                  const isOwn = isOwnMessage(message);

                  return (
                    <div
                      key={message._id || message.id || idx}
                      className={`flex ${
                        isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          isOwn ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isOwn ? "bg-blue-600" : "bg-teal-600"
                          }`}
                        >
                          {isOwn ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`rounded-2xl px-4 py-3 ${
                              isOwn
                                ? "bg-blue-600 text-white"
                                : "bg-card text-foreground border border-input-border"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 px-2">
                            {new Date(
                              message.createdAt || Date.now()
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-card rounded-2xl px-4 py-3 border border-input-border">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-card border-t-2 border-input-border">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border-2 border-input-border bg-background text-foreground rounded-xl focus:border-teal-500 focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
