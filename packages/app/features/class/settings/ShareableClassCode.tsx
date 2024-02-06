import ClipboardButton from 'app/components/ClipboardButton';
import { useClass, useDeleteClassCode, useResetClassCode } from 'app/services/classService';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, H2, Spinner, Text, XStack, YStack } from 'ui';

type ShareableClassCodeProps = {
  classId: string | number;
};

const ShareableClassCode: React.FC<ShareableClassCodeProps> = ({ classId }) => {
  const { data, isLoading, isSuccess } = useClass(classId);
  const { t } = useTranslation();

  const { mutateAsync, isPending } = useResetClassCode(classId);

  const { mutateAsync: deleteAsync, isPending: isDeletePending } = useDeleteClassCode(classId);

  const onReset = async () => {
    await mutateAsync();
  };

  const onDelete = async () => {
    await deleteAsync();
  };

  return (
    <YStack pt="$4">
      <Card p="$4">
        {isLoading && <Spinner />}
        {isSuccess && (
          <YStack>
            {data.code && (
              <XStack py="$4" alignItems="center">
                <YStack f={1}>
                  <Text>{t('views.ShareableClassCode.title')}</Text>
                  <H2>{data.code}</H2>
                </YStack>
                <ClipboardButton text={data.code} />
              </XStack>
            )}

            <Button my="$2" onPress={onReset}>
              {isPending && <Spinner />}
              {!isPending && data.code && t('views.ShareableClassCode.reset')}
              {!isPending && !data.code && t('views.ShareableClassCode.generate')}
            </Button>

            {data.code && (
              <Button my="$2" onPress={onDelete}>
                {isDeletePending && <Spinner />}
                {!isDeletePending && t('views.ShareableClassCode.delete')}
              </Button>
            )}
          </YStack>
        )}
      </Card>
    </YStack>
  );
};

export default ShareableClassCode;
