"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CreditCard, Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const PaymentMethods = () => {
  const { data: session } = useSession();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample payment methods data
  const samplePaymentMethods = [
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
      cardholderName: "John Doe"
    },
    {
      id: "2",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false,
      cardholderName: "John Doe"
    }
  ];

  useEffect(() => {
    const loadPaymentMethods = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPaymentMethods(samplePaymentMethods);
      } catch (error) {
        console.error('Failed to load payment methods:', error);
        toast.error('Failed to load payment methods');
      } finally {
        setLoading(false);
      }
    };

    loadPaymentMethods();
  }, []);

  const handleRemovePaymentMethod = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      toast.success('Payment method removed successfully');
    } catch (error) {
      console.error('Failed to remove payment method:', error);
      toast.error('Failed to remove payment method');
    }
  };

  const handleSetDefault = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setPaymentMethods(prev => 
        prev.map(method => ({
          ...method,
          isDefault: method.id === id
        }))
      );
      toast.success('Default payment method updated');
    } catch (error) {
      console.error('Failed to update default payment method:', error);
      toast.error('Failed to update default payment method');
    }
  };

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Methods</h2>
          <p className="text-gray-600 mt-1">
            Manage your saved payment methods for quick checkout
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </Button>
      </div>

      {/* Payment Methods Grid */}
      {paymentMethods.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No payment methods</h3>
          <p className="text-gray-500 mb-6">
            Add a payment method to make checkout faster
          </p>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Payment Method
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative ${method.isDefault ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCardIcon(method.brand)}</span>
                      <div>
                        <CardTitle className="text-lg">{method.brand}</CardTitle>
                        <p className="text-sm text-gray-600">
                          •••• •••• •••• {method.last4}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {method.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cardholder</span>
                      <span>{method.cardholderName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expires</span>
                      <span>{method.expiryMonth}/{method.expiryYear}</span>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                          className="flex-1"
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemovePaymentMethod(method.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Secure Payment</h4>
              <p className="text-sm text-blue-700 mt-1">
                Your payment information is encrypted and secure. We never store your full card details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethods;
