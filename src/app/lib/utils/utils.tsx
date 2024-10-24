export const missingProperties = {placeholder:undefined, onPointerEnterCapture: undefined, onPointerLeaveCapture: undefined}


export const colorsList = [
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-green-400 via-teal-500 to-blue-600",
    "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600",
    "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600",
    "bg-gradient-to-r from-pink-300 via-red-400 to-yellow-500",
    "bg-gradient-to-r from-teal-300 via-green-400 to-lime-500",
    "bg-gradient-to-r from-primary-200 via-primary-300 to-primary-600"
  ]
  
  export const getIndexColor = (index: number) => {
    return Number(index) < Number(colorsList.length) ? index : Number(index) % Number(colorsList.length);
  };