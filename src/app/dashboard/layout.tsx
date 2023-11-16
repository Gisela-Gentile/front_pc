import { ProjectsProvider } from "../context/ProjectContext";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (   
        <ProjectsProvider> 
            {children}
        </ProjectsProvider>  
    )
}