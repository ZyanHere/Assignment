"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Edit2, User, Mail, Phone } from "lucide-react";

const AboutMe = () => {
  const [formData, setFormData] = useState({
    firstName: "Zyan",
    lastName: "Baishya",
    phone: "+1 (555) 123-4567",
    email: "ABC@gmail.com",
  });
  const [editMode, setEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const inputFields = [
    {
      name: "firstName",
      label: "First Name",
      icon: <User className="w-4 h-4 text-muted-foreground" />,
    },
    {
      name: "lastName",
      label: "Last Name",
      icon: <User className="w-4 h-4 text-muted-foreground" />,
    },
    {
      name: "phone",
      label: "Phone Number",
      icon: <Phone className="w-4 h-4 text-muted-foreground" />,
    },
    {
      name: "email",
      label: "Email",
      icon: <Mail className="w-4 h-4 text-muted-foreground" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl w-full mx-auto px-2 sm:px-4 md:px-8"
    >
      <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-4 sm:p-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <User className="w-6 h-6" />
              Personal Information
            </h2>
            {!editMode && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setEditMode(true)}
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {inputFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label 
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {field.icon}
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    readOnly={!editMode}
                    className={`pl-10 h-12 ${!editMode ? "bg-gray-50" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {editMode && (
            <motion.div
              className="flex justify-end gap-4 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                variant="outline"
                type="button"
                onClick={() => setEditMode(false)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-md"
              >
                Save Changes
              </Button>
            </motion.div>
          )}
        </form>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-2 sm:bottom-6 sm:right-6 bg-green-50 border border-green-200 text-green-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm sm:text-base"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="font-medium">Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AboutMe;