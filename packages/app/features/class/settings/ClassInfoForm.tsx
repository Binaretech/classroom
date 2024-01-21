import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Label, Spinner, View, YStack, useToastController } from 'ui';
import { useClass, useUpdateClass } from 'app/services/classService';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';

export type ClassInfoFormProps = {
  classId: string;
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

type ClassInfoFormData = yup.InferType<typeof schema>;

export default function ClassInfoForm({ classId }: ClassInfoFormProps) {
  const { data, isLoading, isSuccess } = useClass(classId);

  const { show } = useToastController();

  const { mutateAsync, isPending } = useUpdateClass(classId);

  const { t } = useTranslation();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
    },
  });

  const onSubmit = async (data: ClassInfoFormData) => {
    await mutateAsync(data);
    show(t('views.createClassModal.success'), {
      type: 'success',
      duration: 3000,
    });
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        description: data.description,
      });
    }
  }, [data]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Spinner />}
      {isSuccess && (
        <YStack ai="center">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, ...field } }) => (
              <View py="$2" w="100%">
                <Label width={90} htmlFor="name" flex={1}>
                  {t('fields.name')}
                </Label>
                <Input flex={4} placeholder={t('fields.name')} onChangeText={onChange} {...field} />
              </View>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, ...field } }) => (
              <View py="$2" w="100%">
                <Label width={90} htmlFor="description" flex={1}>
                  {t('fields.description')}
                </Label>
                <Input
                  flex={4}
                  placeholder={t('fields.description')}
                  onChangeText={onChange}
                  {...field}
                />
              </View>
            )}
          />
        </YStack>
      )}
      <Form.Trigger asChild>
        <Button disabled={isPending} theme="active" aria-label="submit" px="$5">
          {isPending ? <Spinner /> : t('views.ClassInfoForm.button')}
        </Button>
      </Form.Trigger>
    </Form>
  );
}
