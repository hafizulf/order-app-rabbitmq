const moment = require('moment-timezone');

module.exports.getCurrentDateUTC7 = () => {
  return moment.tz('Asia/Jakarta').format(); // Asia/Jakarta is in UTC+7
};

module.exports.getCurrentDateUTC7Formatted = () => {
  return moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
};
