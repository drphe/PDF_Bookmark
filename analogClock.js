/*!
 * @license
 * Anh Phê - Bookmark 1.4.0
 */
const Clock = document.createElement('div');
createAnalogClock();
function createAnalogClock() {
    Clock.setAttribute("id", "AnalogClock");
    Clock.setAttribute("style", ` background: #16191e;
    height: 110px;
    width: 110px;
    z-index:99999;
    cursor: move;
    position: fixed;
    transform: translate(-50%,-50%);
    top:80px;
    left: 80px;
    box-sizing: content-box;
    border-radius: 50%;
    border: 8px solid #242931;
    box-shadow: 15px 15px 35px rgba(0,0,0,0.2), inset 0 0 30px rgba(0,0,0,0.4);
    background: url(${chrome.runtime.getURL("background-clock.png")}) 0 0/100%;`);

    var hour = document.createElement("div");
    hour.setAttribute("class", "hour handclock");

    var minute = document.createElement("div");
    minute.setAttribute("class", "minute handclock");

    var seconds = document.createElement("div");
    seconds.setAttribute("class", "seconds handclock");

    Clock.appendChild(hour);
    Clock.appendChild(minute);
    Clock.appendChild(seconds);

    set_clock = () => {
        let date_now = new Date();

        let hr = date_now.getHours();
        let min = date_now.getMinutes();
        let sec = date_now.getSeconds();

        let calc_hr = (hr * 30) + (min / 2);
        let calc_min = (min * 6) + (sec / 10);
        let calc_sec = sec * 6;

        hour.style.transform = `rotate(${calc_hr}deg)`;
        minute.style.transform = `rotate(${calc_min}deg)`;
        seconds.style.transform = `rotate(${calc_sec}deg)`;

    }
    set_clock();
    Clock.style.backgroundColor = "white";
    document.body.appendChild(Clock);
    Clock.addEventListener('dblclick', (e) => {
        if (Clock.style.backgroundColor === "white") {
            Clock.style.backgroundColor = "";
        } else {
            Clock.style.backgroundColor = "white";
        }
    })
    setInterval(set_clock, 1000);
	// drag
    var n = !1, offsetX = 110, offsetY = 110;
    Clock.addEventListener("mousedown", function(e) {
        n = !0, offsetX = e.offsetX-50, offsetY = e.offsetY-50
    });
    document.addEventListener("mousemove", function(e) {
        n && (Clock.style.top = e.clientY - offsetY + "px", Clock.style.left = e.clientX - offsetX + "px")
    });
    document.addEventListener("mouseup", function(e) {
        n = !1
    });
}