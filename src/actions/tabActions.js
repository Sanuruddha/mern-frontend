import { CHANGE_ACTIVE_TAB } from "./types";

export const changeActiveTab = (fromTab, ToTab) => {
    return {
        type: CHANGE_ACTIVE_TAB,
        payload: {
            fromTab,
            ToTab
        }
    };
};