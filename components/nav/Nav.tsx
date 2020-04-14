import Link from "./Link";

export const Nav = () => (
	<div className="nav-wrapper">
		<div className="center">
			<a className="nav-link logo" href="/" />
			<nav>
				<Link activeClassName="active" href="/">
					<a className="nav-link">Для пользователей</a>
				</Link>
				<Link activeClassName="active" href="/about">
					<a className="nav-link">Для водителей</a>
				</Link>
			</nav>
			<div className="rightNav">
				<a href="tel:+78614133333" className="phone">
					+7 (861-41) 3-33-33
				</a>
			</div>
		</div>
	</div>
);
