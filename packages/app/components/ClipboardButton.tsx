import { Copy } from '@tamagui/lucide-icons';
import { useCallback } from 'react';
import { Button, ButtonProps, useToastController } from 'ui';
import * as Clipboard from 'expo-clipboard';
import { useTranslation } from 'react-i18next';

export type ClipboardButtonProps = {
  text: string;
} & Omit<ButtonProps, 'onPress'>;

export default function ClipboardButton({ text, ...props }: ClipboardButtonProps) {
  const { show } = useToastController();
  const { t } = useTranslation();

  const onPress = useCallback(async () => {
    await Clipboard.setStringAsync(text);
    show(t('views.copiedToClipboard'));
  }, [text]);

  return <Button scaleIcon={1.2} icon={Copy} circular chromeless {...props} onPress={onPress} />;
}
