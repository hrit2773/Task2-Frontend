export const capitalizeFirstLetter=(st:string)=>{
    if (!st) return ''
    const newstring=st.charAt(0).toUpperCase() + st.slice(1).toLowerCase()
    return newstring
}