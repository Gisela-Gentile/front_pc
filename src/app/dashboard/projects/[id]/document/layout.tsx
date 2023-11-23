import { DocumentProvider } from "@/app/context/DocumentContext";

export default function DocumentLayout({ children, }: { children: React.ReactNode }) {
    return (  
        <DocumentProvider>
            {children}
        </DocumentProvider>
    );
}