import PostList from 'app/components/postList/PostList';
import { useTranslation } from 'react-i18next';
import { Separator, SizableText, Tabs, TabsContentProps, YStack } from 'ui';

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
    <Tabs
      defaultValue={tabs[0]?.value}
      orientation="horizontal"
      flexDirection="column"
      overflow="hidden"
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
        <TabsContent key={tab.value} value={tab.value}>
          {tab.render(classId)}
        </TabsContent>
      ))}
    </Tabs>
  );
}

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content key="tab3" alignItems="center" justifyContent="center" flex={1} {...props}>
      {props.children}
    </Tabs.Content>
  );
};
