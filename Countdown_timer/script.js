const domTime = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
};

const addTime = 1000 * 10 * 60 * 60 * 24;
const daysInTime = addTime / (1000 * 60 * 60 * 24);
const goalTime = Date.now() + addTime;

const interval = setInterval(() => {
    const timeNow = Date.now();
    const timer = goalTime - timeNow;
    if (timer < 0) {
        clearInterval(interval);
        alert("Congratulations. The time has come!!!");
    } else {
        const formattedTime = getFormatTime(timer);
        renderTime(formattedTime, domTime);
    }
}, 1000);

const getFormatTime = (time) => {
    return {
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((time % (1000 * 60)) / 1000),
    };
};

const renderTime = (timeData, domData) => {
    Object.keys(timeData).forEach((key) => {
        if (domData[key] != null) {
            domData[key].querySelector(".timer__num").innerHTML = timeData[key];
            changeCircleStyle(
                domData[key].querySelector(".segment"),
                key,
                timeData[key]
            );
        }
    });
};

const changeCircleStyle = (elem, key, value) => {
    let style = elem.style;
    if (["seconds", "minutes"].includes(key)) {
        style.strokeDasharray = `${value} 60`;
    } else if (key === "hours") {
        const hoursSegment = (60 / 24) * value;
        style.strokeDasharray = `${hoursSegment} 60`;
    } else if (key === "days") {
        const daysSegment = (60 / daysInTime) * value;
        style.strokeDasharray = `${daysSegment} 60`;
    }

    style.strokeLinecap = value ? "round" : "initial";
};
