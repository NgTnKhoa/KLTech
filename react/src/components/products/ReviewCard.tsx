
import {Product} from "@/models/product.model.ts";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
      <div className="border rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-2 mb-1">
          <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
            {review.author.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm font-medium">{review.author}</div>
          <div className="text-xs text-muted-foreground ml-auto">{review.date}</div>
        </div>
        <div className="flex mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
              <svg
                  key={i}
                  className={`w-4 h-4 ${
                      i <= review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
              </svg>
          ))}
        </div>
        <p className="text-sm text-gray-800">{review.content}</p>
      </div>
  );
};

export default ReviewCard;
