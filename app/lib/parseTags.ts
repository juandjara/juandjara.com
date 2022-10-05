import type { PostListItem } from "./posts.server"

export default function parseTags(post: PostListItem) {
  return post?.tag?.split(',').map(t => t.trim()) || []
}
