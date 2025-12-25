import { useState } from "react";
import { Star, MapPin, Calendar, Edit2, Trash2, ThumbsUp } from "lucide-react";
import { useToast } from "../../UI/ToastProvider/ToastProvider";

interface Review {
  _id: string;
  hotelName: string;
  hotelLocation: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  images?: string[];
}

export default function ReviewsTab() {
  const toast = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      _id: "1",
      hotelName: "Grand Luxury Hotel",
      hotelLocation: "New York, USA",
      rating: 5,
      title: "Amazing stay!",
      comment:
        "The hotel exceeded all expectations. The staff was incredibly friendly, the room was spotless, and the location was perfect for exploring the city. Would definitely recommend!",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 12,
    },
    {
      _id: "2",
      hotelName: "Seaside Resort",
      hotelLocation: "Miami, Florida",
      rating: 4,
      title: "Great beach access",
      comment:
        "Beautiful resort with direct beach access. The pool area was fantastic and the breakfast buffet had great variety. Only minor issue was the WiFi speed.",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 8,
    },
    {
      _id: "3",
      hotelName: "Mountain View Lodge",
      hotelLocation: "Aspen, Colorado",
      rating: 5,
      title: "Perfect winter getaway",
      comment:
        "Stunning views, cozy rooms with fireplaces, and excellent ski-in/ski-out access. The hot tub after a day on the slopes was heavenly!",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 15,
    },
  ]);

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review._id !== id));
    toast.success("Review deleted successfully");
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

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 mb-6">
              Share your experiences by reviewing your past stays
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg">
              Write a Review
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-amber-300 transition-all hover:shadow-lg"
              >
                {/* Hotel Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {review.hotelName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{review.hotelLocation}</span>
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
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-semibold text-gray-700 ml-2">
                    {review.rating}.0
                  </span>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {review.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {review.helpful} found this helpful
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
                  <p className="text-2xl font-bold text-gray-900">
                    {averageRating}
                  </p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Edit2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.reduce((sum, r) => sum + r.helpful, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Helpful Votes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
