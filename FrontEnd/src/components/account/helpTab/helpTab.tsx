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

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
  read: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function HelpTab() {
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can we help you today?",
      sender: "support",
      timestamp: new Date(),
      read: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  // Initialize Socket.io connection
  useEffect(() => {
    const user = storage.getUser();
    if (!user) return;

    // Replace with your actual backend URL
    const newSocket = io("http://localhost:5000", {
      auth: {
        userId: user.id,
      },
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      toast.success("Connected to support chat");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      toast.warning("Disconnected from support chat");
    });

    newSocket.on("message", (data: { text: string; timestamp: string }) => {
      const newMessage: Message = {
        id: Math.random().toString(36).substring(7),
        text: data.text,
        sender: "support",
        timestamp: new Date(data.timestamp),
        read: false,
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    });

    newSocket.on("typing", () => {
      setIsTyping(true);
    });

    newSocket.on("stop-typing", () => {
      setIsTyping(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Send via Socket.io if connected
    if (socket && isConnected) {
      socket.emit("message", {
        text: inputMessage,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Fallback: simulate response
      setTimeout(() => {
        const response: Message = {
          id: Math.random().toString(36).substring(7),
          text: "Thank you for your message. A support agent will respond shortly.",
          sender: "support",
          timestamp: new Date(),
          read: false,
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
    }

    setInputMessage("");
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
      text: faq.question,
      sender: "user",
      timestamp: new Date(),
      read: true,
    };

    const botResponse: Message = {
      id: Math.random().toString(36).substring(7),
      text: faq.answer,
      sender: "support",
      timestamp: new Date(),
      read: false,
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Phone</p>
                  <p className="text-blue-600 text-sm">1-800-EXPEDIA</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Email</p>
                  <p className="text-purple-600 text-sm">support@expedia.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Hours</p>
                  <p className="text-green-600 text-sm">24/7 Support</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => askFAQ(faq)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700 hover:text-gray-900"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl overflow-hidden border-2 border-gray-200 h-[600px] flex flex-col">
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
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.sender === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === "user"
                            ? "bg-blue-600"
                            : "bg-teal-600"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-900 border border-gray-200"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl px-4 py-3 border border-gray-200">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
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
              <div className="p-4 bg-white border-t-2 border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
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
