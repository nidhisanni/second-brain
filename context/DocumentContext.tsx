"use client";

import { createContext, useContext, useState } from "react";

type DocumentContextType = {
  selectedDocument: string | null;
  setSelectedDocument: (id: string) => void;
};

const DocumentContext = createContext<DocumentContextType>({
  selectedDocument: null,
  setSelectedDocument: () => {},
});

export function DocumentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  return (
    <DocumentContext.Provider
      value={{
        selectedDocument,
        setSelectedDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  return useContext(DocumentContext);
}