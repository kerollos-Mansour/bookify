import { useState } from "react";
import { Star, User as UserIcon } from "lucide-react";
import { useToast } from "../../UI/ToastProvider/ToastProvider";
import {
  useGetHotelReviewsQuery,
  useCreateReviewMutation,
} from "../../../store/api/reviews.api";
import { useAppSelector } from "../../../store/hooks";

interface ReviewsSectionProps {
  hotelId: string;
}

export default function ReviewsSection({ hotelId }: ReviewsSectionProps) {
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);
  const { data: reviews = [], isLoading } = useGetHotelReviewsQuery(hotelId);
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to leave a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      await createReview({
        hotelid: hotelId as any, // Type cast if necessary as backend expects ObjectId string
        userid: user.id, // Using the correct user ID property
        rating,
        comment,
      }).unwrap();

      toast.success(
        "Review submitted successfully! It will be visible after approval."
      );
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading reviews...</div>;
  }

  return (
    <div className="py-8 border-t border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>

      {/* Reviews List */}
      <div className="space-y-6 mb-10">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-4 bg-gray-50 rounded-xl">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    {/* Access user data safely if populated */}
                    <p className="font-semibold text-gray-900">
                      {(review.userid as any)?.username || "Guest"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-medium text-amber-700">
                    {review.rating}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Review Form */}
      {user ? (
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-2">Reflect on your stay</h3>
          <p className="text-gray-500 mb-6 text-sm">
            How was your experience at this hotel?
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredStar || rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Review
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about the rooms, service, and location..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
          <h3 className="text-blue-900 font-semibold mb-1">
            Want to write a review?
          </h3>
          <p className="text-blue-700 text-sm">
            Please log in to share your experience.
          </p>
        </div>
      )}
    </div>
  );
}
