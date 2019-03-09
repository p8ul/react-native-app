/**
 *  extract url parameters from an object
 *  params {Object} params
 */
export const formatObjectToParams = params => {
  let url = "";
  if (typeof params === "object") {
    if (Object.keys(params).length >= 1) {
      Object.keys(params).forEach(key => {
        url += `${key}=${params[key]}&`;
      });
      // remove last &
      url = url.slice(0, -1);
    }
  }
  return url;
};

export const getUserFromEmail = email => {
  return email.substr(0, email.indexOf("@"));
};

export default { formatObjectToParams };
