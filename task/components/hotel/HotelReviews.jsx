'use client';

import React, { useState, useEffect } from 'react';
import { getReviews, likeReview, unlikeReview } from '@/lib/api/review';
import { Star, ThumbsUp, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

const HotelReviews = ({ productId, variantId }) => {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const params = { product_id: productId, sort: sortBy };
        if (variantId) params.variant_id = variantId;
        if (selectedFilter !== 'all') params.stars = selectedFilter;

        const result = await getReviews(params);

        if (result.status === 'success') {
          const reviewsWithLikeState = result.data.reviews.map(r => ({ ...r, likedByCurrentUser: false }));
          setReviews(reviewsWithLikeState);
          setTotalReviews(result.results);

          if (result.results > 0) {
            const allReviewsResult = await getReviews({ product_id: productId });
            if (allReviewsResult.status === 'success' && allReviewsResult.results > 0) {
              const totalStars = allReviewsResult.data.reviews.reduce((sum, r) => sum + r.stars, 0);
              const allReviewsCount = allReviewsResult.results;
              setAverageRating(allReviewsCount > 0 ? totalStars / allReviewsCount : 0);

              const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
              allReviewsResult.data.reviews.forEach(review => {
                if (distribution[review.stars] !== undefined) {
                  distribution[review.stars]++;
                }
              });
              setRatingDistribution(distribution);
            }
          } else {
            setAverageRating(0);
            setRatingDistribution({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
          }
        }
      } catch (error) {
        console.error("Failed to fetch reviews from component:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId, variantId, selectedFilter, sortBy]);

  const mappedReviews = reviews.map(review => ({
    id: review._id,
    rating: review.stars,
    comment: review.content,
    date: review.createdAt,
    helpful: review.like_count,
    likedByCurrentUser: review.likedByCurrentUser,
    user: {
      name: review.customer_id?.userName || 'Anonymous',
      avatar: review.customer_id?.avatar,
    },
    reply: review.reply,
  }));

  const handleLikeToggle = async (reviewId, isCurrentlyLiked) => {
    const originalReviews = [...reviews];
    try {
      setReviews(currentReviews =>
        currentReviews.map(review =>
          review._id === reviewId
            ? {
              ...review,
              like_count: isCurrentlyLiked ? review.like_count - 1 : review.like_count + 1,
              likedByCurrentUser: !isCurrentlyLiked,
            }
            : review
        )
      );

      if (isCurrentlyLiked) {
        await unlikeReview(reviewId);
      } else {
        await likeReview(reviewId);
      }

    } catch (error) {
      console.error("Failed to toggle like from component:", error);
      setReviews(originalReviews);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
      />
    ));
  };

  const getRatingPercentage = (rating) => {
    const allReviewsCount = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);
    if (allReviewsCount === 0) return 0;
    return Math.round((ratingDistribution[rating] / allReviewsCount) * 100);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" /> Reviews
          </CardTitle>
        </CardHeader>
        <CardContent><div className="text-center py-8">Loading...</div></CardContent>
      </Card>
    );
  }

  const allReviewsCount = Object.values(ratingDistribution).reduce((a, b) => a + b, 0);

  if (allReviewsCount === 0 && !isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" /> Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews yet</p>
            <p className="text-sm text-gray-400">Be the first to review this product!</p>
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
          Reviews ({allReviewsCount})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mt-1">{renderStars(averageRating)}</div>
              <div className="text-sm text-gray-600 mt-1">out of 5</div>
            </div>
          </div>
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
                  <span className="text-sm text-gray-600 w-12">{ratingDistribution[rating]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
        <div className="space-y-4">
          {mappedReviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user?.avatar} />
                  <AvatarFallback>{review.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.user?.name || 'Anonymous'}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                    <Badge variant="outline" className="text-xs">{review.rating.toFixed(1)}</Badge>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(review.date), 'MMM dd, yyyy')}
                    </div>
                    {review.helpful > 0 && (
                      <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleLikeToggle(review.id, review.likedByCurrentUser)}>
                        <ThumbsUp className={`h-3 w-3 ${review.likedByCurrentUser ? 'text-blue-500 fill-current' : ''}`} />
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
      </CardContent>
    </Card>
  );
};

export default HotelReviews;