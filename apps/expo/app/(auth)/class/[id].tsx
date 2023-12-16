import { RouteProp, useRoute } from '@react-navigation/native';
import ClassScreen from 'app/features/class/screen';
import { SafeAreaView } from 'react-native';

export default function Class() {
  const route = useRoute<RouteProp<RootStackParamList, 'class/[id]'>>();

  const { id } = route.params;

  return (
    <SafeAreaView style={{ width: '100%' }}>
      <ClassScreen id={id} />
    </SafeAreaView>
  );
}
