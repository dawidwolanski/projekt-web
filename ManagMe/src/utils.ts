export const generateId = () => Math.random().toString(36).substr(2, 9);

export const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
  
    const monthNames = [
      "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", 
      "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];
  
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    const formattedDate = `${day} ${month} ${year}`;
  
    return formattedDate;
  }