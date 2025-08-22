// src/shared/api/review.js
import { api } from "./base";

// 태그 조회
export const fetchReviewTags = (category) =>
  api.get(`/reviews/tag?category=${category}`);

// 가게 리뷰
export const fetchReviewsByStore = (storeId) =>
  api.get(`/reviews/store/${storeId}/`);
export const createReview = (storeId, data) =>
  api.post(`/reviews/store/${storeId}/`, data);

// 유저 리뷰
export const fetchReviewsByUser = (userId) =>
  api.get(`/reviews/user/${userId}/`);

// 리뷰 단건
export const fetchReviewDetail = (reviewId) =>
  api.get(`/reviews/${reviewId}/`);
export const updateReview = (reviewId, data) =>
  api.put(`/reviews/${reviewId}/`, data);
export const deleteReview = (reviewId) =>
  api.delete(`/reviews/${reviewId}/`);

// 좋아요 토글
export const toggleReviewLike = (reviewId) =>
  api.post(`/reviews/${reviewId}/like/`);
