/**
 * @extends Error
 */
module.exports = class StatusCodeError extends Error
{
  /**
   * @constructor
   * @param {string} message 
   * @param {number} status 
   */
  constructor(message, status)
  {
    super(message);
    this.status = status;
  }

  /**
   * @param {number} statusCode 
   * @returns {string}
   */
  static getStatusMessage(statusCode)
  {
    switch(statusCode)
    {
      case 400: return "Bad Request";
      case 401: return "Unauthorized";
      case 402: return "Payment Required";
      case 403: return "Forbidden";
      case 404: return "Not Found";
      case 405: return "Method Not Allowed";
      case 406: return "Not Acceptable";
      case 407: return "Proxy Authentication Required";
      case 408: return "Request Timeout";
      case 409: return "Conflict";
      case 410: return "Gone";
      case 411: return "Length Required";
      case 412: return "Precondition Failed";
      case 413: return "Request Entity Too Large";
      case 414: return "Request-URI Too Long";
      case 415: return "Unsupported Media Type";
      case 416: return "Requested Range Not Satisfiable";
      case 417: return "Expectation Failed";
      case 418: return "I'm a teapot";
      case 419: return "Insufficient Space on Resource";
      case 420: return "Method Failure";
      case 421: return "Misdirected Request";
      case 422: return "Unprocessable Entity";
      case 423: return "Locked";
      case 424: return "Failed Dependency";
      case 428: return "Precondition Required";
      case 429: return "Too Many Requests";
      case 431: return "Request Header Fields Too Large";
      case 451: return "Unavailable For Legal Reasons";
      case 500: return "Internal Server Error";
      case 501: return "Not Implemented";
      case 502: return "Bad Gateway";
      case 503: return "Service Unavailable";
      case 504: return "Gateway Timeout";
      case 505: return "HTTP Version Not Supported";
      case 507: return "Insufficient Storage";
      case 511: return "Network Authentication Required";
      default: return 'Something went wrong';
    }
  }
}
