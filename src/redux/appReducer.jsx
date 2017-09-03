import update from 'react-addons-update';
import { combineReducers } from 'redux';
import constants from './constants';

const initialState = {
  initialUI: {
    screenWidth: 0,
    showSidebar: true,
    showFavorites: true,
    showLocalLinks: true,
    showSearch: false,
    showDropdownLocation: false,
    showSiteSettings: false,
    showAlertNotification: false,
    showQuickLook: false,
    showFeedPreview: false,
    showArticlePreview: false,
    showGreyColumn: true,
    showSlideGreyColumn: false,
    showActiveTableView: false,
  },
};

const uiReducer = (state = initialState.initialUI, action) => {
  switch (action.type) {
    case constants.TOGGLE_SIDEBAR:

      if (state.showSidebar === true) {
        return update(state, {
          showSidebar: { $set: false },
          showFavorites: { $set: false },
          showLocalLinks: { $set: false },
        });
      } else if (state.showSidebar === false) {
        return update(state, {
          showSidebar: { $set: true },
          showFavorites: { $set: false },
          showLocalLinks: { $set: false },
        });
      }

      return update(state, {
        showSidebar: { $apply: currentState => !currentState },
      }
    );
    case constants.TOGGLE_FAVORITES:
    // window.// console.log("state TOGGLE_FAVORITES:" + state.showFavorites);
      if (state.showSidebar === false) {
        return update(state, {
          showSidebar: { $set: true },
          showFavorites: { $set: false },
          showLocalLinks: { $set: false },
        });
      }
      return update(state, {
        showFavorites: { $apply: currentState => !currentState },
      });
    case constants.TOGGLE_LOCAL_LINKS:
    // window.console.log("state TOGGLE_FAVORITES:" + state.showFavorites);
      if (state.showSidebar === false) {
        return update(state, {
          showSidebar: { $set: true },
          showFavorites: { $set: false },
          showLocalLinks: { $set: false },
        });
      }
      return update(state, {
        showLocalLinks: { $apply: currentState => !currentState },
      });
    case constants.TOGGLE_SEARCH:
      return update(state, {
        showSearch: { $apply: currentState => !currentState },
      }
    );
    case constants.TOGGLE_LOCATION_DROPDOWN:
      return update(state, {
        showDropdownLocation: { $apply: currentState => !currentState },
      }
    );
    case constants.TOGGLE_SITE_SETTINGS:
      return update(state, {
        showSiteSettings: { $apply: currentState => !currentState },
        showArticlePreview: { $set: false },
        showFeedPreview: { $set: false },
        showQuickLook: { $set: false },
        showAlertNotification: { $set: false },
      }
    );
    case constants.TOGGLE_ALERT_NOTIFICATION:
      return update(state, {
        showAlertNotification: { $apply: currentState => !currentState },
        showArticlePreview: { $set: false },
        showFeedPreview: { $set: false },
        showQuickLook: { $set: false },
        showSiteSettings: { $set: false },
      }
    );
    case constants.TOGGLE_QUICK_LOOK:
      return update(state, {
        showQuickLook: { $apply: currentState => !currentState },
        showArticlePreview: { $set: false },
        showFeedPreview: { $set: false },
        showSiteSettings: { $set: false },
        showAlertNotification: { $set: false },
      }
    );
    case constants.TOGGLE_FEED_PREVIEW:
      return update(state, {
        showFeedPreview: { $apply: currentState => !currentState },
        showArticlePreview: { $set: false },
        showQuickLook: { $set: false },
        showSiteSettings: { $set: false },
        showAlertNotification: { $set: false },
      }
    );
    case constants.TOGGLE_ARTICLE_PREVIEW:
      return update(state, {
        showArticlePreview: { $apply: currentState => !currentState },
        showFeedPreview: { $set: false },
        showQuickLook: { $set: false },
        showSiteSettings: { $set: false },
        showAlertNotification: { $set: false },
      }
    );
    case constants.TOGGLE_GREY_COLUMN:
      return update(state, {
        showGreyColumn: { $apply: currentState => !currentState },
      }
    );
    case constants.TOGGLE_SLIDE_GREY_COLUMN:
    //   return update(state, {
    //     showSlideGreyColumn: { $apply: currentState => !currentState },
    //   }
    // );
      if (state.showGreyColumn === true) {
        return update(state, {
          showSlideGreyColumn: { $apply: currentState => !currentState },
        });
      }
      return state;
    case constants.SCREEN_RESIZE:
      // window.// console.log("action SCREEN_RESIZE:" + action.screen);
      // window.// console.log("state TOGGLE_SIDEBAR:" + state.showSidebar);

      if (action.screen <= 1091) {
        return update(state, {
          showSidebar: { $set: false },
          showFavorites: { $set: false },
          showLocalLinks: { $set: false },
          showGreyColumn: { $set: true },
          showSlideGreyColumn: { $set: true },
          showActiveTableView: { $set: true },
        });
      } else if (action.screen >= 1092 && action.screen <= 1523) {
        return update(state, {
          showSidebar: { $set: false },
          showFavorites: { $set: false },
          showLocalLinks: { $set: false },
          showGreyColumn: { $set: false },
          showSlideGreyColumn: { $set: true },
          showActiveTableView: { $set: false },
        });
      } else if (action.screen >= 1524) {
        return update(state, {
          showSidebar: { $set: true },
          showFavorites: { $set: false },
          showLocalLinks: { $set: false },
          showGreyColumn: { $set: false },
          showSlideGreyColumn: { $set: true },
          showActiveTableView: { $set: false },
        });
      }

      return state + parseFloat(action.screen);

    default:
      return state;
  }
};

const appReducer = combineReducers({ ui: uiReducer });

export default appReducer;
