function scrollTo(element, to, duration) {
  const scrollElement = element;
  if (duration <= 0) return;
  const difference = to - scrollElement.scrollTop;
  const perTick = (difference / duration) * 10;

  setTimeout(() => {
    scrollElement.scrollTop += perTick;
    if (scrollElement.scrollTop === to) return;
    scrollTo(scrollElement, to, duration - 10);
  }, 10);
}

function truncate(text, characters, useWordBoundary) {
  if (!text) {
    return '';
  }

  const isTooLong = text.length > characters;
  let s_ = isTooLong ? text.substr(0, characters - 1) : text;

  s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;

  return isTooLong ? `${s_}...` : s_;
}

module.exports = { scrollTo, truncate };
