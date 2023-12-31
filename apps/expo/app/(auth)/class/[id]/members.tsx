import { useClassId } from 'app/provider/ClassIdProvider';
import MembersView from 'app/features/class/MembersView';

export default function Posts() {
  const classId = useClassId();

  return <MembersView classId={classId} />;
}
