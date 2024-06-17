export const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

 export const BASE_URL = "https://freezy-small-dew-912.fly.dev";
//export const BASE_URL = "http://localhost:8080";