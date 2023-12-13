import { useClass } from 'app/services/classService';
import { YStack, Spinner, Text, XStack, ScrollView } from 'ui';
import ClassCover from './ClassCover';
import ClassTabs from './ClassTabs';

export default function ClassScreen({ id }: { id: string }) {
  const { isLoading, data, refetch } = useClass(id);

  return (
    <ScrollView>
      <YStack>
        {isLoading && <Spinner />}
        {data && (
          <YStack>
            <XStack p="$4">
              <Text fontSize="$6" fontWeight="bold">
                {data.name}
              </Text>
            </XStack>

            <ClassCover />

            <ClassTabs classId={id} />
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
}
