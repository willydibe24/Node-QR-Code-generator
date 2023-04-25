// Module to get back to the homepage and to generate a new QR Code

export const regenerate = () => {
    document.getElementById('text').value = "";
    document.getElementById('file').value = "";
    document.querySelector('.content').style.display = "flex";
    document.querySelector('.hidden').style.display = "none";
}