import PostList from 'app/components/postList/PostList';
import { useTranslation } from 'react-i18next';
import { Separator, SizableText, Tabs } from 'ui';
import PostsView from './PostsView';
import MembersView from './MembersView';

const tabs = [
  {
    value: 'posts',
    label: 'views.class.tabs.posts',
    render: (classId: string | number) => <PostsView classId={classId} />,
  },
  {
    value: 'members',
    label: 'views.class.tabs.members',
    render: (classId: string | number) => <MembersView classId={classId} />,
  },
];

export type ClassTabsProps = {
  classId: string | number;
};

export default function ClassTabs({ classId }: ClassTabsProps) {
  const { t } = useTranslation();

  return (
    <Tabs
      defaultValue={tabs[0]?.value}
      flex={1}
      orientation="horizontal"
      flexDirection="column"
      w="100%"
    >
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab br="$0" key={tab.value} value={tab.value}>
            <SizableText>{t(tab.label)}</SizableText>
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Separator />

      {tabs.map((tab) => (
        <Tabs.Content flex={1} key={tab.value} value={tab.value}>
          {tab.render(classId)}
        </Tabs.Content>
      ))}
    </Tabs>
  );
}
