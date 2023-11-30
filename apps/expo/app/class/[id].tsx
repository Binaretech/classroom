import { RouteProp, useRoute } from '@react-navigation/native';
import ClassScreen from 'app/features/class/screen';
import { SafeAreaView } from 'react-native';

type RouteParams = {
  id: string;
};

export default function Class() {
  const route = useRoute<RouteProp<RootStackParamList, 'class/[id]'>>();

  const { id } = route.params;

  return (
    <SafeAreaView>
      <ClassScreen id={id} />
    </SafeAreaView>
  );
}
