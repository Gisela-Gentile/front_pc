import { ProjectsProvider } from "../context/ProjectContext";
import Nav from "./components/Nav";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {


    return (  
        <div className="container-fluid">
            <div className="row">
                <div id="sidebar" className="mt-3" style={{['width' as any]: "250px",['minHeight' as any]:"700px",['position' as any]:"absolute",}}>
                   <Nav/>               
                </div>
        <div id="content" style={{ ['borderLeft' as any]: "1px solid #ccc",['minHeight' as any]:"700px",['paddingLeft' as any]:'260px',}}>   
            <ProjectsProvider>
                {children}
            </ProjectsProvider>
        </div>
      </div> 
    </div>
    );
}