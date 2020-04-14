import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateAnnouncement } from "../redux/actions/announcements";
import { Layout } from "../components/Layout";
import { Benefits } from "../components/home/Benefits";
import { Map } from "../components/home/Map";

interface Props {
	announcementMessage: string;
	updateAnnouncement: any;
}

interface IState {}

export default connect(
	(state: { message: string }) => ({
		announcementMessage: state.message
	}),
	(dispatch: any) => ({
		updateAnnouncement: bindActionCreators(updateAnnouncement, dispatch)
	})
)(
	class IndexPage extends Component<Props, IState> {
		render() {
			const { announcementMessage, updateAnnouncement } = this.props;
			return (
				<Layout>
					Announcement: {announcementMessage}
					<button onClick={() => updateAnnouncement("We are closed today!")}>Close!</button>
					<div className="container web">
						<div className="container map">
							{/* <Quiz /> */}
							<Map />
						</div>
						<Benefits />
					</div>
				</Layout>
			);
		}
	}
);
