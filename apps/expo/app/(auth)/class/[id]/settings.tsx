import { ScrollView } from 'ui';
import ClassSettings from 'app/features/class/settings/ClassSettings';
import { RouteProp, useRoute } from '@react-navigation/native';

export default function Settings() {
  const route = useRoute<RouteProp<RootStackParamList, 'class/[id]'>>();

  return (
    <ScrollView>
      <ClassSettings classId={route.params.id} />
    </ScrollView>
  );
}
