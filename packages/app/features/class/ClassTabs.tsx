import PostList from 'app/components/postList/PostList';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { Separator, SizableText, Tabs } from 'ui';

const tabs = [
  {
    value: 'posts',
    label: 'views.class.tabs.posts',
    render: (classId: string | number) => <PostList classId={classId} />,
  },
];

export type ClassTabsProps = {
  classId: string | number;
};

export default function ClassTabs({ classId }: ClassTabsProps) {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue={tabs[0]?.value} orientation="horizontal" flexDirection="column" w="100%">
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab br="$0" key={tab.value} value={tab.value}>
            <SizableText>{t(tab.label)}</SizableText>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Separator />

      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={'posts'}>
          {tab.render(classId)}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
