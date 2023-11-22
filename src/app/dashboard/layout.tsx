import { ProjectsProvider } from "../context/ProjectContext";
import Nav from "./components/Nav";
import styles from '@/app/dashboard/layout.module.css'
export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (  
        <div className="container-fluid">
            <div id="sidebar" className={styles.sidebar}>
                <Nav/>               
            </div>
            <div id="content" className={styles.content}>   
                <ProjectsProvider>
                    {children}
                </ProjectsProvider>
            </div>
        </div> 
    );
}