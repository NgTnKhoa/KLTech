import {Review, ReviewRequest} from "@/models/review.model.ts";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {MoreHorizontal, Star} from "lucide-react";
import {useState} from "react";
import {reviewService} from "@/services/review.service.ts";
import {toast} from "sonner";
import {Product} from "@/models/product.model.ts";

interface ReviewCardProps {
  product: Product;
  author: string;
  review: Review;
  onDelete: (id: string) => void;
  onEdit: (updatedReview: Review) => void;
}

const ReviewCard = ({product, author, review, onDelete, onEdit}: ReviewCardProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(review.content);
  const [editedRating, setEditedRating] = useState(review.rating);

  const handleDelete = async () => {
    await reviewService.deleteReview(review.id);
    onDelete(review.id);
    toast.success("Xóa đánh giá sản phẩm thành công");
    setOpenDelete(false);
  };

  const handleEdit = async () => {
    const reviewRequest: ReviewRequest = {
      rating: editedRating,
      content: editedContent,
      author: author,
      productId: product.id,
    }

    const updatedReview = (await reviewService.updateReview(review.id, reviewRequest)).data;
    onEdit(updatedReview);
    toast.success("Cập nhật thành công");
  };

  return (
      <div className="border rounded-xl py-4 px-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-1 justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
              {review.author?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="text-sm font-medium">{review.author}</div>
            <div className="text-xs text-muted-foreground ml-auto">
              {
                new Date(review.createdAt).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }
            </div>
          </div>
          <div>
            {
              (author !== null) && (author === review.author) ?
                  (
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <MoreHorizontal className="h-6 w-6 cursor-pointer"/>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setOpenEdit(true)}>Chỉnh sửa</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpenDelete(true)}>Xóa</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Delete Dialog */}
                        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Bạn có chắc muốn xoá review này?</AlertDialogTitle>
                              <AlertDialogDescription>Hành động này không thể hoàn tác.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Huỷ</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete}>Xoá</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Edit Dialog */}
                        <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Chỉnh sửa đánh giá</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có thể cập nhật lại nội dung và số sao.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex items-center space-x-1 mt-1 mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                      key={star}
                                      type="button"
                                      onClick={() => setEditedRating(star)}
                                      className={`text-xl ${
                                          star <= editedRating ? "text-yellow-400" : "text-gray-400"
                                      } hover:text-yellow-500`}
                                  >
                                    <Star
                                        className="h-5 w-5"
                                        fill={star <= editedRating ? "currentColor" : "none"}
                                        stroke="currentColor"
                                    />
                                  </button>
                              ))}
                            </div>
                            <div>
                  <textarea
                      className="w-full border rounded p-2"
                      value={editedContent}
                      onChange={e => setEditedContent(e.target.value)}
                  />
                            </div>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Huỷ</AlertDialogCancel>
                              <AlertDialogAction onClick={handleEdit}>Lưu</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                  )
                  :
                  (<div></div>)
            }
          </div>
        </div>
        <div className="flex mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
              <Star
                  key={i}
                  className={`w-4 h-4 ${
                      i <= review.rating ? "text-yellow-400" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  stroke="currentColor"
              />
          ))}
        </div>
        <p className="text-sm text-gray-800">{review.content}</p>
      </div>
  );
};

export default ReviewCard;
