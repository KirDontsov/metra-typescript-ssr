import * as React from "react";
import Head from "next/head";
import { Nav } from "./nav/Nav";
import { Footer } from "./footer/Footer";

type Props = {
	title?: string;
};

export const Layout: React.FunctionComponent<Props> = ({ children, title = "This is the default title" }) => (
	<div className="wrapper">
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
		</Head>

		<Nav />
		{children}
		<Footer />
	</div>
);
