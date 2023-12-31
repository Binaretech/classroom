import MembersList from 'app/components/membersList/MembersList';

export default function MembersView({ classId }: { classId: string | number }) {
  return <MembersList classId={classId} />;
}
