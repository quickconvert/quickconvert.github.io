let ffmpeg;
let starttime;

async function setupffmpeg() {
    while (!window.FFmpeg) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const FFmpeg = window.FFmpeg
    ffmpeg = new FFmpeg()
    console.log(ffmpeg)
    ffmpeg.on("log", ({message}) => console.log(message))
    const coreURL = "/ffmpeg-core.js"
    await ffmpeg.load({coreURL})

    ffmpeg.on("progress", (progress) => {
        const elapsedSec = (Date.now() / 1000) - starttime;
        const progressPercentage = progress["progress"];

        const estimatedTotalSec = elapsedSec / progressPercentage;
        const remainingSec = estimatedTotalSec - elapsedSec;

        const remainingDays = Math.floor(remainingSec / (24 * 3600));
        const remainingHours = Math.floor((remainingSec % (24 * 3600)) / 3600);
        const remainingMinutes = Math.floor((remainingSec % 3600) / 60);
        const remainingSeconds = Math.floor(remainingSec % 60);

        let remainingTime = "";
        if (remainingDays > 0) {
            remainingTime += `${remainingDays}d `;
        }
        if (remainingHours > 0 || remainingDays > 0) {
            remainingTime += `${remainingHours}h `;
        }
        if (remainingMinutes > 0 || remainingHours > 0 || remainingDays > 0) {
            remainingTime += `${remainingMinutes}m `;
        }
        remainingTime += `${remainingSeconds}s`;

        window.bar.value = progressPercentage.toString();
        window.bart.textContent = (progressPercentage * 100).toFixed(2) + "% - " + `Remaining: ${remainingTime}`;
        document.title = "QuickConvert - " + (progressPercentage * 100).toFixed(2) + "%";
    });


}
setupffmpeg()

const convertways = {
    
    "png": ["jpg", "jpeg", "webp", "jfif", "jpe", "bmp", "gif"],
    "jpg": ["png", "jpeg", "webp", "jfif", "jpe", "bmp", "gif"],
    "jpeg": ["png", "jpg", "webp", "jfif", "jpe", "bmp", "gif"],
    "jfif": ["png", "jpg", "jpeg", "webp", "jpe", "bmp", "gif"],
    "jpe": ["png", "jpg", "jpeg", "webp", "jfif", "bmp", "gif"],
    "webp": ["png", "jpg", "jfif", "jpeg", "jpe", "bmp", "gif"],
    "tiff": ["png", "jpg", "jpeg", "jfif", "jpe", "webp", "bmp", "gif"],
    "bmp": ["png", "jpg", "jpeg", "jfif", "jpe", "webp", "gif"],
    "gif": ["png", "jpg", "jpeg", "jfif", "jpe", "webp", "bmp", "mp4", "mov", "avi", "mkv", "flv", "wmv", "mpeg", "mpg", "ogv", "3gp", "ts"],
    "svg": ["png", "jpg", "jfif", "jpeg", "jpe", "webp", "bmp", "gif"],

    "mp3": ["wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "wav": ["mp3", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "ogg": ["mp3", "wav", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "aiff": ["mp3", "wav", "ogg", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "aac": ["mp3", "wav", "ogg", "aiff", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "opus": ["mp3", "wav", "ogg", "aiff", "aac", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "ac3": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "dts": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "mp2": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "wma": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "m4a", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "m4a": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "flac", "amr", "spx", "mpc", "shn", "thd"],
    "flac": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "amr", "spx", "mpc", "shn", "thd"],
    "amr": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "spx", "mpc", "shn", "thd"],
    "spx": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "mpc", "shn", "thd"],
    "mpc": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "shn", "thd"],
    "shn": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "thd"],
    "thd": ["mp3", "wav", "ogg", "aiff", "aac", "opus", "ac3", "dts", "mp2", "wma", "m4a", "flac", "amr", "spx", "mpc", "shn"],

    "mp4": ["mov", "avi","mkv", "flv", "wmv", "mpeg", "gif"],
    "mov": ["mp4", "avi","mkv", "flv", "wmv", "mpeg", "gif"],
    "webm": ["mp4", "mov","avi", "mkv", "flv", "wmv", "mpeg", "gif"],
    "avi": ["mp4", "mov", "mkv", "flv", "wmv", "mpeg", "gif"],
    "mkv": ["mp4", "mov", "avi", "flv", "wmv", "mpeg", "gif"],
    "flv": ["mp4", "mov", "avi", "mkv", "wmv", "mpeg", "gif"],
    "wmv": ["mp4", "mov", "avi", "mkv", "flv", "mpeg", "gif"],
    "mpeg": ["mp4", "mov", "avi", "mkv", "flv", "wmv", "gif"],
    "mpg": ["mp4", "mov", "avi", "mkv", "flv", "wmv", "gif"],
    "ogv": ["mp4", "mov", "avi", "mkv", "flv", "wmv", "gif"],
    "3gp": ["mp4", "mov", "avi", "mkv", "flv", "wmv", "gif"],
    "ts": ["mp4", "mov", "avi", "mkv", "flv", "wmv", "gif"]
    
}
const allformats = Object.keys(convertways)


async function convert(file, type, progressbar) {
        starttime = new Date() / 1000
        window.bar.value = "0"
        window.bart.textContent = "Getting Ready..."
        let oldtype = file.name.split('.').pop().toLowerCase();
        console.log(oldtype)

        let filebuff;

        if (oldtype == "svg") {
            const aspng  = await new Promise((resolve, reject) => {
            const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        const dataUrl = canvas.toDataURL("image/png");
                        resolve(dataUrl)
                    }
                    img.src = event.target.result;
                }
                reader.readAsDataURL(file);

            })
            const r1 = await fetch(aspng)
            filebuff = await r1.arrayBuffer()
            oldtype = "png"
        }

        if (!filebuff) {
            filebuff = await new Promise ((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function(event) {
                        resolve(event.target.result)
                };
                reader.readAsArrayBuffer(file);
            })                   
        }

            
        while (!ffmpeg) {
            await new Promise(resolve => setTimeout(resolve, 100));
            document.getElementById("wait").style.display = ""
        }
        document.getElementById("wait").style.display = "none"
        await ffmpeg.writeFile("input." + oldtype, new Uint8Array(filebuff))
        let faketype = type
        if (type == "jfif" || type == "jpe") {
            faketype = "jpg"
        }

        await ffmpeg.exec([
            '-i', 'input.' + oldtype,
            'output.' + faketype
        ]);
        
        const newdata = await ffmpeg.readFile('output.' + faketype)
        const newblob = new Blob([newdata.buffer], { type: 'application/octet-stream'})
        const blobUrl = URL.createObjectURL(newblob);
        return blobUrl

}


document.addEventListener("DOMContentLoaded", function() {
    const uploadbtn = document.getElementById("uploadbtn")
    const filein = document.getElementById("filein")
    const convertto = document.getElementById("choosefiletype")
    const filename = document.getElementById("filename")
    const selectElement = document.getElementById("filetype");
    window.bar = document.getElementById("progressbar")
    window.bart = document.getElementById("progtext")
    const ctot = document.getElementById("converttotxt")
    let a = ""
    for (i of allformats) {
        a += "." + i + ","
    }
    filein.accept = a
    var file;
    uploadbtn.onclick = function() {
        filein.click()
    }
    filein.onchange = function() {
        if (filein.files.length == 0) {
            return
        }
        file = filein.files[0];
        const extension = file.name.split('.').pop().toLowerCase();
        const formats = convertways[extension]
        if (!formats) {
            return
        }
        filename.textContent = file.name
        convertto.style.display = ""
        selectElement.innerHTML = `<option value="" selected disabled>Choose option</option>`
        for (const i of formats) {
            const option = document.createElement("option")
            option.textContent = i
            selectElement.appendChild(option)
        }


        selectElement.focus()
    }
    selectElement.onchange = async function() {
        if (!file) {
            return
        }
        const selectedOption = selectElement.options[selectElement.selectedIndex].value;
        selectElement.style.display = "none"
        ctot.style.display = "none"
        window.bar.style.display = ""
        window.bart.style.display = ""
        const locationUrl = await convert(file, selectedOption)
        const link = document.createElement("a");
        link.href = locationUrl;

        const lastDotIndex = file.name.lastIndexOf('.');
        const filename = file.name.substring(0, lastDotIndex)
        
        link.download = filename + "." + selectedOption;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        convertto.style.display = "none"
        window.bar.style.display = "none"
        window.bart.style.display = "none"

        
        document.title = "QuickConvert"
        window.bar.value = "0"
        window.bart.textContent = ""
        selectElement.style.display = ""
        ctot.style.display = ""
        
        
    }
})