import { PropsWithChildren, createContext, useContext } from 'react';

const ClassIdContext = createContext<string | undefined>(undefined);

export function ClassIdProvider({ children, classId }: PropsWithChildren<{ classId: string }>) {
  return <ClassIdContext.Provider value={classId}>{children}</ClassIdContext.Provider>;
}

export const useClassId = () => {
  const context = useContext(ClassIdContext);

  if (context === undefined) {
    throw new Error('useClassId must be used within a ClassIdProvider');
  }
  return context;
};
