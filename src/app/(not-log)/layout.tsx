export default function NotLogLayout({ children, }: { children: React.ReactNode }) {
    return (  
        <div className="container">            
            {children}             
        </div>
    );
}