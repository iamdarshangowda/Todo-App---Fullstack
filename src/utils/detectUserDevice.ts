function isMobileDevice() {
  const userAgent =
    typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
  const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'windows phone'];

  for (let keyword of mobileKeywords) {
    if (userAgent.includes(keyword)) {
      return true;
    }
  }

  return false;
}

export default isMobileDevice;
