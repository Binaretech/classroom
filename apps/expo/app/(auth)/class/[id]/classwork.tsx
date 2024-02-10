import { useClassId } from 'app/provider/ClassIdProvider';
import Classwork from 'app/features/class/Classwork/Classwork';

export default function ClassworkTab() {
  const classId = useClassId();

  return <Classwork classId={classId} />;
}
