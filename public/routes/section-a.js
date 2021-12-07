const button = document.getElementById("input-button");
const modal = document.getElementById("modal");

button.onclick = function() {
    setTimeout(() => {
        modal.style.display = "block";
        // $("#camera-btn").show().focus().click().hide();
        window.open("/scanner", "_self");
    }, 500);


    // setTimeout(() => {
    //     window.close();
    //     // setTimeout(() => { window.close(); }, 2000);
    //     // setTimeout(() => { window.close(); }, 4000);
    //     window.open('/section-a', '_self').close();
    // }, 3000);
}