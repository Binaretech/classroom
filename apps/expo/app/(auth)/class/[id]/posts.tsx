import { useClassId } from 'app/provider/ClassIdProvider';
import PostsView from 'app/features/class/PostsView';

export default function Posts() {
  const classId = useClassId();

  return <PostsView classId={classId} />;
}
