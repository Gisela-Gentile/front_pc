import { Fragment } from "react";
import { Row } from "react-bootstrap";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (
        
        <div className="row">
        <div id="sidebar" className="col-md-3" >
            Barra
        </div>
        <div id="content" className="col-md-9" style={{ ['borderLeft' as any]: "1px solid #ccc" }}>
            {children}
        </div>
        </div>
        
    )
}