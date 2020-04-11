import * as React from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
	title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children, title = "This is the default title" }) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
		</Head>
		<header>
			<nav>
				<Link href="/">
					<a>Home</a>
				</Link>{" "}
				|{" "}
				<Link href="/about">
					<a>About</a>
				</Link>{" "}
				|{" "}
				<Link href="/users">
					<a>Список юзеров</a>
				</Link>{" "}
				| <a href="/api/users">Users API</a>
			</nav>
		</header>
		{children}
		<footer>
			<hr />
			<span>Я тут (Footer)</span>
		</footer>
	</div>
);

export default Layout;
