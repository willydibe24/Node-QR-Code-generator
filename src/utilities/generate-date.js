// Module to generate date 

export function generateDate() {
    let date = new Date().toLocaleString();
    date = date.replaceAll("/", "-");
    
    return date;
}