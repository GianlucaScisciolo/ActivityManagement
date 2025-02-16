export const formatoDate = (dateStr, formato) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  if(dateStr === "") {
    return "";
  }
  if(formato === "GG-MM-AAAA") {
    return `${day}-${month}-${year}`;
  }
  else if(formato === "AAAA-MM-GG") {
    return `${year}-${month}-${day}`;
  }
}

export const formatoTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':');
  return `${hours}:${minutes}`;
}

export const dizionarioOrari = () => {
  return {
    "07:00": [0, 0, 0], "07:30": [1, 0, 0], 
    "08:00": [2, 0, 0], "08:30": [3, 0, 0], 
    "09:00": [4, 0, 0], "09:30": [5, 0, 0], 
    "10:00": [6, 0, 0], "10:30": [7, 0, 0], 
    "11:00": [8, 0, 0], "11:30": [9, 0, 0], 
    "12:00": [10, 0, 0], "12:30": [11, 0, 0], 
    "13:00": [12, 0, 0], "13:30": [13, 0, 0], 
    "14:00": [14, 0, 0], "14:30": [15, 0, 0], 
    "15:00": [16, 0, 0], "15:30": [17, 0, 0], 
    "16:00": [18, 0, 0], "16:30": [19, 0, 0], 
    "17:00": [20, 0, 0], "17:30": [21, 0, 0], 
    "18:00": [22, 0, 0], "18:30": [23, 0, 0], 
    "19:00": [24, 0, 0], "19:30": [25, 0, 0], 
    "20:00": [26, 0, 0], "20:30": [27, 0, 0], 
    "21:00": [28, 0, 0], "21:30": [29, 0, 0], 
    "22:00": [30, 0, 0]
  }
};










