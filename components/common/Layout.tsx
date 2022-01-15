import Navigation from "./Navigation";

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Navigation />
            <section className="main container my-5">
                {children}
            </section>
        </>
    )
};

export default Layout;
