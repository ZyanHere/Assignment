"use client";
import { useState, useEffect } from "react";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  X,
  RefreshCw
} from "lucide-react";

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: X,
  refunded: CheckCircle,
  failed: X,
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  processing: "bg-purple-100 text-purple-800 border-purple-200",
  shipped: "bg-indigo-100 text-indigo-800 border-indigo-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  refunded: "bg-orange-100 text-orange-800 border-orange-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

export default function OrderTrackingModal({ 
  isOpen, 
  onClose, 
  order, 
  trackingData,
  onRefresh,
  trackingLoading = false
}) {
  const getProgressPercentage = (status) => {
    const progressMap = {
      pending: 10,
      confirmed: 20,
      processing: 40,
      shipped: 70,
      delivered: 100,
      cancelled: 0,
      refunded: 100,
      failed: 0,
    };
    return progressMap[status] || 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      await onRefresh();
    }
  };

  if (!order) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">
                  Order Tracking - #{order.order_number || order.id}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Track your order from placement to delivery
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={trackingLoading}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${trackingLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Loading State */}
            {trackingLoading && (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading tracking information...</p>
              </div>
            )}

            {/* Content when tracking data is available */}
            {trackingData && (
              <>
                {/* Order Summary */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Order Date</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(trackingData.created_at || order.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Total Items</p>
                          <p className="text-sm text-gray-500">
                            {trackingData.items?.length || 0} items
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Order Status</p>
                          <p className="text-sm text-gray-500">
                            {trackingData.status || order.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Delivery Progress</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Order Progress</span>
                        <span className="text-sm text-gray-500">
                          {trackingData.progress_percentage || getProgressPercentage(trackingData.status || order.status)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${trackingData.progress_percentage || getProgressPercentage(trackingData.status || order.status)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[trackingData.status || order.status] || statusColors.pending}`}>
                          {(trackingData.status || order.status).charAt(0).toUpperCase() + (trackingData.status || order.status).slice(1)}
                        </span>
                        {trackingData.estimated_delivery_date && (
                          <div className="text-sm text-gray-500">
                            Estimated: {formatDate(trackingData.estimated_delivery_date)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking History */}
                {trackingData.tracking_history && trackingData.tracking_history.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Tracking History</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {trackingData.tracking_history.map((event, index) => {
                          const IconComponent = statusIcons[event.status] || Clock;
                          return (
                            <div key={index} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusColors[event.status] || statusColors.pending}`}>
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                {index < trackingData.tracking_history.length - 1 && (
                                  <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">
                                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {event.description}
                                    </p>
                                    {event.location && (
                                      <p className="text-sm text-gray-500 mt-1">
                                        📍 {event.location}
                                      </p>
                                    )}
                                    {event.tracking_number && (
                                      <p className="text-sm text-blue-600 mt-1">
                                        Tracking: {event.tracking_number}
                                      </p>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-400">
                                    {formatDate(event.timestamp)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                {trackingData.items && trackingData.items.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {trackingData.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">{item.product_name}</p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity} • {item.vendor_store}
                                </p>
                                {item.tracking_number && (
                                  <p className="text-sm text-blue-600">
                                    Tracking: {item.tracking_number}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || statusColors.pending}`}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Vendor Orders */}
                {trackingData.vendor_orders && trackingData.vendor_orders.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Vendor Orders</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {trackingData.vendor_orders.map((vendorOrder, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">{vendorOrder.vendor_store}</p>
                                <p className="text-sm text-gray-500">
                                  Order: {vendorOrder.vendor_order_number}
                                </p>
                              </div>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[vendorOrder.status] || statusColors.pending}`}>
                                {vendorOrder.status}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>Progress: {vendorOrder.progress_percentage}%</span>
                              {vendorOrder.estimated_delivery_date && (
                                <span>Est. Delivery: {formatDate(vendorOrder.estimated_delivery_date)}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 