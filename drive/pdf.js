//start download
init();

function init() {
    var isSave = true;
    var downloadTitle;
    try {
        const metaElements = document.querySelectorAll("meta[property='og:title']");
        if (metaElements.length > 0) {
            downloadTitle = metaElements[0].content;

        } else {
            const divElements = document.querySelector("#drive-active-item-info");
            const text = removeDoubleQuotes(divElements.textContent);
            var temp = text.split(",")[1]
            downloadTitle = temp.split(":")[1]
            var temp2 = text.split(",")[0]
            var id = temp2.split(":")[1]
            if (id) {
                var link = "https://drive.google.com/file/d/" + id.trim() + "/view";
                alert("You must show view page, scroll to end of this document and download it.");
                isSave = false;
                window.open(link);
            }
            console.log(downloadTitle)
        }
        downloadTitle = (downloadTitle && downloadTitle.endsWith(".pdf")) ? downloadTitle : "googledrive-download-file.pdf";
    } catch (e) {
        console.log(e);
        isSave = false;
	alert("Can't download!");
    }
    if (isSave) createPDFtoDownload(downloadTitle);
}

function removeDoubleQuotes(text) {
    const parts = text.split("\"");
    return parts.join("");
}

// hàm tạo pdf
async function createPDFtoDownload(name) {
    let pdf = new jsPDF();
    let elements = document.getElementsByTagName("img");
    for (let i in elements) {
        let img = elements[i];
        console.log("add img ", img);
        if (!/^blob:/.test(img.src)) {
            console.log("invalid src");
            continue;
        }
        let can = document.createElement("canvas");
        let con = can.getContext("2d");
        can.width = img.width;
        can.height = img.height;
        con.drawImage(img, 0, 0, img.width, img.height);
        let imgData = can.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.addPage();
    }

    await pdf.save(name);
}