export const UPDATE_ANNOUNCEMENT = "UPDATE_ANNOUNCEMENT";

export const updateAnnouncement = (message: string) => (dispatch: any) => {
	return dispatch({ type: UPDATE_ANNOUNCEMENT, message });
};
