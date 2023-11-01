export default function FooterPrincipal() {
    return (
        <footer className="bg-light py-4 bg ">
            <div className="container-footer ">
                <p className="text-center mb-0">
                    Todos los derechos reservados &copy; {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
}
