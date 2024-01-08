const formatTimestamp=(timestamp)=> {
    const date = new Date(timestamp);
    // Get hours, minutes, and AM/PM
    const hours = date.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
    const minutes = ('0' + date.getMinutes()).slice(-2);
    // Construct the formatted string
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }

  const getAmPm=(timestamp)=>{
    const date = new Date(timestamp);
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return ampm
  }

  export {formatTimestamp,getAmPm}
  