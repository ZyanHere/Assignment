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
      icon: <User className="w-4 h-4 text-amber-500" />,
    },
    {
      name: "lastName",
      label: "Last Name",
      icon: <User className="w-4 h-4 text-amber-500" />,
    },
    {
      name: "phone",
      label: "Phone Number",
      icon: <Phone className="w-4 h-4 text-amber-500" />,
    },
    {
      name: "email",
      label: "Email",
      icon: <Mail className="w-4 h-4 text-amber-500" />,
    },
  ];

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl mx-auto pt-6 sm:pt-10"
      >
        <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Top gradient line */}
          <motion.div
            className="h-2 bg-gradient-to-r from-amber-400 to-orange-400 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Header */}
          <div className="w-full bg-white px-4 sm:px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />
              Personal Information
            </h2>
            {!editMode && (
              <Button
                variant="outline"
                className="gap-2 border-2 border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400 hover:shadow-lg transition-all duration-200 rounded-xl text-sm sm:text-base"
                onClick={() => setEditMode(true)}
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Form */}
          <div className="w-full px-4 sm:px-6 py-6 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {inputFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="w-full"
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {field.label}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      readOnly={!editMode}
                      className={`pl-12 h-12 sm:h-14 text-base rounded-xl transition-all duration-300 group-hover:shadow-md w-full ${
                        !editMode
                          ? "bg-gray-50/80 cursor-default border-gray-200"
                          : "bg-white border-amber-200 focus:border-orange-400 focus:ring-4 focus:ring-amber-100/50 hover:border-amber-300"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            {editMode && (
              <motion.div
                className="flex flex-col sm:flex-row justify-end gap-4 mt-8 sm:mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 rounded-xl px-6 text-sm sm:text-base"
                >
                  Cancel
                </Button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    Save Changes
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-6 right-4 sm:right-8 bg-green-50 border-2 border-green-200 text-green-900 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
            >
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              <div>
                <div className="font-bold text-sm sm:text-base">Success!</div>
                <div className="text-xs sm:text-sm text-green-700">
                  Profile updated successfully
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AboutMe;
