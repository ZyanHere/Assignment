'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { format } from 'date-fns';

const HotelReviews = ({ 
  reviews = [], 
  averageRating = 0, 
  totalReviews = 0,
  showAll = false,
  maxDisplay = 5 
}) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter reviews based on rating
  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === '5') return review.rating === 5;
    if (selectedFilter === '4') return review.rating === 4;
    if (selectedFilter === '3') return review.rating === 3;
    if (selectedFilter === '2') return review.rating === 2;
    if (selectedFilter === '1') return review.rating === 1;
    return true;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  const displayReviews = showAll ? sortedReviews : sortedReviews.slice(0, maxDisplay);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  const getRatingPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    return Math.round((ratingDistribution[rating] / totalReviews) * 100);
  };

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews yet</p>
            <p className="text-sm text-gray-400">Be the first to review this hotel!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Reviews ({totalReviews})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating Summary */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Average Rating */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mt-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-sm text-gray-600 mt-1">out of 5</div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${getRatingPercentage(rating)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
          >
            All ({totalReviews})
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={selectedFilter === rating.toString() ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(rating.toString())}
            >
              {rating}★ ({ratingDistribution[rating]})
            </Button>
          ))}
        </div>

        <div className="flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {displayReviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user?.avatar} />
                  <AvatarFallback>
                    {review.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.user?.name || 'Anonymous'}</span>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {review.rating}.0
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(review.date), 'MMM dd, yyyy')}
                    </div>
                    {review.helpful && (
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {review.helpful} found this helpful
                      </div>
                    )}
                  </div>
                  
                  {review.reply && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">Hotel Response</span>
                        <Badge variant="secondary" className="text-xs">Official</Badge>
                      </div>
                      <p className="text-sm text-gray-700">{review.reply}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && sortedReviews.length > maxDisplay && (
          <div className="text-center pt-4">
            <Button variant="outline">
              Show All {totalReviews} Reviews
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelReviews; 