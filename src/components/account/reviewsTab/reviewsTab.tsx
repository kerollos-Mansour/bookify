import { useState } from "react";
import { Star, MapPin, Calendar, Edit2, Trash2, ThumbsUp } from "lucide-react";
import { useToast } from "../../UI/ToastProvider/ToastProvider";
import {
  useGetUserReviewsQuery,
  useDeleteReviewMutation,
} from "../../../store/api/reviews.api";
import { useAppSelector } from "../../../store/hooks";

export default function ReviewsTab() {
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);
  const { data: reviews = [], isLoading } = useGetUserReviewsQuery(
    user?.id || "",
    {
      skip: !user?.id,
    }
  );
  const [deleteReviewApi] = useDeleteReviewMutation();

  const deleteReview = async (id: string) => {
    try {
      await deleteReviewApi(id).unwrap();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  const editReview = (id: string) => {
    toast.info("Edit functionality coming soon!");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  if (isLoading) {
    return (
      <div className="bg-card rounded-3xl shadow-sm overflow-hidden p-8 text-center animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-4"></div>
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <Star className="w-8 h-8 text-white fill-white" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">My Reviews</h2>
              <p className="text-amber-100 text-sm">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""} •{" "}
                {averageRating} average rating
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <Star className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No reviews yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Share your experiences by reviewing your past stays
            </p>
            {/* Removed "Write a Review" button as it usually happens from a booking or hotel page */}
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-card/50 dark:bg-card border-2 border-input-border rounded-2xl p-6 hover:border-amber-300 transition-all hover:shadow-lg"
              >
                {/* Hotel Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">
                      {review.hotelid?.name || "Unknown Hotel"}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {review.hotelid?.location?.city || ""}{" "}
                        {review.hotelid?.location?.countryCode || ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editReview(review._id)}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit review"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= review.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-semibold text-foreground ml-2">
                    {review.rating}.0
                  </span>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  {/* Removed Title as backend doesn't support it yet */}
                  {/* <h4 className="font-semibold text-foreground mb-2">
                    {review.title}
                  </h4> */}
                  <p className="text-card-foreground/90 leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-input-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {review.helpfulCount || 0} found this helpful
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {reviews.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {averageRating}
                  </p>
                  <p className="text-sm text-foreground/70">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Edit2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {reviews.length}
                  </p>
                  <p className="text-sm text-foreground/70">Total Reviews</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {reviews.reduce((sum, r) => sum + (r.helpfulCount || 0), 0)}
                  </p>
                  <p className="text-sm text-foreground/70">Helpful Votes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
