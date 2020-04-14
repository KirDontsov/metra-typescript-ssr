import { Announcement } from "../../interfaces/announcement";
import * as announcementActions from "../actions/announcements";

const initialState: Announcement = {
	message: "No announcement..."
};

export const announcementReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case announcementActions.UPDATE_ANNOUNCEMENT:
			return Object.assign({}, state, { message: action.message });
		default:
			return state;
	}
};
