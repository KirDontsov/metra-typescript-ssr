import React from "react";
import { Provider } from "react-redux";
import App, { AppProps } from "next/app";
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux/store";
import "../styles/index.scss";

export default withRedux(initStore)(
	class MyApp extends App {
		static async getInitialProps({ Component, ctx }: AppProps | any) {
			const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
			return { pageProps: pageProps };
		}

		render() {
			const { Component, pageProps, store }: AppProps | any = this.props;
			return (
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			);
		}
	}
);
