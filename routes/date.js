exports.myDate = (raw_date) => {
    const date = new Date().toLocaleDateString("en-CA");
    return date;
  };
  
  exports.equalDate = (date1, date2) => {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true;
    }
    return false;
  };
  