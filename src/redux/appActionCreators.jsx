import constants from './constants';

const appActionCreators = {
  toggleSidebar() {
    return {
      type: constants.TOGGLE_SIDEBAR,
    };
  },
  toggleFavorites() {
    return {
      type: constants.TOGGLE_FAVORITES,
    };
  },
  toggleLocalLinks() {
    return {
      type: constants.TOGGLE_LOCAL_LINKS,
    };
  },
  toggleSearch() {
    return {
      type: constants.TOGGLE_SEARCH,
    };
  },
  screenResize(screenWidth) {
    return {
      type: constants.SCREEN_RESIZE,
      screen: screenWidth,
    };
  },
  toggleDropdownLocation() {
    return {
      type: constants.TOGGLE_LOCATION_DROPDOWN,
    };
  },
  toggleSiteSettings() {
    return {
      type: constants.TOGGLE_SITE_SETTINGS,
    };
  },
  toggleGreyColumn() {
    return {
      type: constants.TOGGLE_GREY_COLUMN,
    };
  },
  toggleSlideGreyColumn() {
    return {
      type: constants.TOGGLE_SLIDE_GREY_COLUMN,
    };
  },
  toggleActiveTableView() {
    return {
      type: constants.TOGGLE_ACTIVE_TABLE_VIEW,
    };
  },
  toggleAlertNotification() {
    return {
      type: constants.TOGGLE_ALERT_NOTIFICATION,
    };
  },
  toggleQuickLook(quickMenu, baseRoute) {
    return {
      type: constants.TOGGLE_QUICK_LOOK,
      quickMenu,
      baseRoute,
    };
  },
  toggleFeedPreview() {
    return {
      type: constants.TOGGLE_FEED_PREVIEW,
    };
  },
  toggleArticlePreview() {
    return {
      type: constants.TOGGLE_ARTICLE_PREVIEW,
    };
  },
};

export default appActionCreators;
