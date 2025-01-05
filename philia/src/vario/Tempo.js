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









