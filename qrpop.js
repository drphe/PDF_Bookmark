const emptyImg = '<svg width="90" height="60" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>';

document.addEventListener("keyup", function(e) {
    27 === e.keyCode && (e.preventDefault(), window.close())
})
var QRtext = document.getElementById("QRtext");
var QRcode = document.getElementById("qrcode");
var titleText = document.getElementById("titletext");
var defaultText = 'Quét mã code phía dưới.'
var shortlink = defaultText;
chrome.tabs.query({
    active: true
}, function(tab) {
    var url = tab[0].url;
    if (url != null) {
        callQrgen(tab[0].url);
    } else {
        titleText.innerText = "Không thể lấy URL của trang này.";
    }
})
async function callQrgen(text = document.getElementById("QRtext").value) {
    QRtext.value = text;
    var qrcode = new QRCode({
        content: text,
	padding: 2,
        container: "svg", //Responsive use
        join: true, //Crisp rendering and 4-5x reduced file size
        width: 256,
        height: 256
    });
    QRcode.innerHTML = qrcode.svg();
    shortlink = await rutgonlink(text);
    titleText.innerText = shortlink === defaultText ? defaultText: shortlink;
}
QRtext.addEventListener("input", function(t) {
    let a = t.target.value;
    if (a && a.length > 2) {
	callQrgen(a);
	QRcode.classList.remove('padd');
    }
    else {
	titleText.innerText = "Dữ liệu trống!"
	QRcode.innerHTML = emptyImg;
	QRcode.setAttribute("class", "padd");
   }
});
document.getElementById("downloadQrButton").addEventListener("click", function(t) {
    downloadSVG()
});
document.getElementById("copyQrButton").addEventListener("click", function(t) {
    downloadSVG(true)
});

function downloadSVG(copy = false) {
    const input = document.querySelector('svg')
    //const output = document.querySelector('#output')
    const svgData = new XMLSerializer().serializeToString(input)
    const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)))
    const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`
    const image = new Image()
    image.addEventListener('load', () => {
        const width = input.getAttribute('width')
        const height = input.getAttribute('height')
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, width, height)
        const dataUrl = canvas.toDataURL('image/png')
        //output.src = dataUrl
        if (copy) {
	    if(shortlink !== defaultText) {
		navigator.clipboard.writeText(shortlink).then(() => {
    			alertCopy();
		    }, o => {
    			alertCopy("Có lỗi")
		});
	    }else   canvas.toBlob(blob => {
                navigator.clipboard.write([
     		new ClipboardItem({
                        'image/png': blob
                    })
   		 ]).then(() => {
                    alertCopy();
                }).catch(error => {
                    alertCopy("Có lỗi")
                });
            });
        } else {
            const link = document.createElement('a');
            link.href = dataUrl
            link.download = `MyQrcode-${getNgayHienTai()}.png`;
            link.click();
        }
    })
    image.src = svgDataUrl
}
function alertCopy(x = "Đã sao chép") {
    let div = document.createElement("div");
    div.setAttribute("style", "max-width: 60%; min-width: 150px; padding: 0px 14px; height: 40px; color: rgb(255, 255, 255); line-height: 40px; text-align: center; border-radius: 4px; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; background: rgba(0, 0, 0, 0.7); font-size: 16px; transition: transform 0.5s ease-in 0s, opacity 0.5s ease-in 0s; opacity: 1;");
    div.innerHTML = x;
    document.body.appendChild(div);
    setTimeout(() => {
        div.style.opacity = 0;
    }, 500);
    setTimeout(() => {
        document.body.removeChild(div);
    }, 1000);
}
function getNgayHienTai() {
    let ngayHienTai = new Date();
    let ngay = ngayHienTai.getDate();
    let thang = ngayHienTai.getMonth() + 1;
    let nam = ngayHienTai.getFullYear();
    if (ngay < 10) {
        ngay = '0' + ngay;
    }
    if (thang < 10) {
        thang = '0' + thang;
    }
    return ngay + '-' + thang + '-' + nam;
}

async function rutgonlink(link){
    var u = `https://phimtat.vn/api/rut-gon-link.php?long=`;
    var t = defaultText;
    var url = encodeURI(link);
    if (url.startsWith("http://")||url.startsWith("https://")){	
	var a = await fetch(u + url);
	var b = await a.json();
	if (b.status === 'ok') return b.link;
	else return t;
	}else return t;
}

