export function getColor(value, j, tipo){
  return (j === 0) ? ("#FFFFFF") : (
    (value < 0) ? "#FF0000" : (value > 0 ? "#00FF00" : "#FFFFFF")
  )
}









