import Link from "next/link";
import {useRouter} from "next/router";

interface Path {
    label: string;
    url: string;
}

const Navigation: React.FC = () => {
    const paths: Path[] = [
        {label: 'Users', url: '/users'},
        {label: 'Tweets', url: '/tweets'},
        {label: 'Follows', url: '/profile_follows'},
    ];

    const router = useRouter();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">Twitter Copy</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {
                        paths.map((item, key) => {
                            return (
                                <li className={router.pathname == item.url ? "nav-item active" : "nav-item"} key={key}>
                                    <Link href={`${item.url}`}>
                                        <a className="nav-link">{item.label}{router.pathname == item.url ? (<span className="sr-only">(current)</span>) : ""}</a>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                {/*<li className="nav-item dropdown">*/}
                {/*    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"*/}
                {/*       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*        Profile*/}
                {/*    </a>*/}
                {/*    <div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                {/*        <a className="dropdown-item" href="#">Login</a>*/}
                {/*        <a className="dropdown-item" href="#">Register</a>*/}
                {/*        <div className="dropdown-divider"></div>*/}
                {/*        <a className="dropdown-item" href="#">Settings</a>*/}
                {/*    </div>*/}
                {/*</li>*/}
            </div>
        </nav>
    )
}

export default Navigation;
