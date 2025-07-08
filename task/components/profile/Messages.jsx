"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, Send, Loader2 } from "lucide-react";
import { fetchUserMessages } from "@/lib/api/profile";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Messages() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // Fetch user messages
  useEffect(() => {
    const loadMessages = async () => {
      if (session?.user?.token) {
        try {
          const messagesData = await fetchUserMessages();
          setMessages(messagesData);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
          // Continue with empty messages
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadMessages();
  }, [session]);

  // Pre-fill form with user data
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || ""
      }));
    }
  }, [session]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    try {
      // Here you would typically send the message to your backend
      // For now, we'll simulate sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully!');
      setFormData({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b p-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            Contact Us
          </h1>
          <p className="text-muted-foreground mt-2">
            Have questions? Send us a message and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Contact Info Sidebar */}
          <div className="bg-gray-50 p-6 lg:p-8 border-r">
            <div className="space-y-8">
              {/* Call Us */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Call Us</h3>
                  <p className="text-muted-foreground mt-1">
                    Available 24/7 for customer support
                  </p>
                  <p className="font-medium mt-2 text-blue-600">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email Us</h3>
                  <p className="text-muted-foreground mt-1">
                    We'll respond within 24 hours
                  </p>
                  <p className="font-medium mt-2 text-blue-600">
                    support@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your inquiry..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}