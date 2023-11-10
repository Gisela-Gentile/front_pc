import { Fragment } from "react";
import { Row } from "react-bootstrap";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (   
        <div> 
            {children}
        </div>        
    )
}