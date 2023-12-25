import PostList from 'app/components/postList/PostList';

export default function PostsView({ classId }: { classId: string | number }) {
  return <PostList classId={classId} />;
}
