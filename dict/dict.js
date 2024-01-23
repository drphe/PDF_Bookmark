const imgsrc = `data:image/png;base64,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`;

// khởi tạo
const popupdictionary = document.createElement('div');
popupdictionary.setAttribute("class", "lln-full-dict down");
popupdictionary.setAttribute("style", "inset: auto auto auto 396.641px;position:fixed;");
// loa
const audioTTS = document.createElement('div');
audioTTS.setAttribute("class", "lln-dict-speak");
popupdictionary.appendChild(audioTTS);
// đóng
const closepop = document.createElement('div');
closepop.setAttribute("class", "close-dict");
popupdictionary.appendChild(closepop);
// add something
const contentdic = document.createElement('div');
contentdic.setAttribute("class", "lln-dict-def lln-styled-scrollbar lln-scroll-event-added");
contentdic.setAttribute("style", "height: 340px;");
popupdictionary.appendChild(contentdic);

const defineword = document.createElement('div');
defineword.setAttribute("class", "def-word");
contentdic.appendChild(defineword);

popupdictionary.style.display = "none";
document.body.appendChild(popupdictionary);
console.log("Insert Dictionary!!")

var speaking = !0, heightP = 340, widthP = 400;

// Bắt sự kiện dblclick trên toàn bộ trang web
document.addEventListener("dblclick", async function(event) {
    // Lấy nội dung của từ được click đúp
    var word = "";
    if (window.getSelection) {
        word = Aa(window.getSelection().toString());
    } else if (document.selection && document.selection.type != "Control") {
        word = Aa(document.selection.createRange().text);
    }
    // Nếu có nội dung
    if (word) {
	let widthEvent = event.view.innerWidth, heightEvent = event.view.innerHeight,
	x = event.clientX < 200 ? 220: (event.clientX + 200 > widthEvent? widthEvent-200: event.clientX),
	y = event.clientY + heightP +20 < heightEvent ? event.clientY +40 : heightEvent - heightP -20
        openPopup(word, x, y)
        console.log("Lookup word: " + word);
    }
});

async function openPopup(w, x, y) {
    var canclose = !0;
    // Hiển thị popup
    popupdictionary.style.display = "block";

    // Thiết lập vị trí của popup theo tọa độ của chuột
    popupdictionary.style.left = x -200+ "px";
    popupdictionary.style.top = y + "px";

    // Thêm nội dung vào popup
    waiting(); // hiển thị loading
    await getContent(w, "en", "vi")
	debounce(canclose&&speakWord(),50);
// Hàm debounce để giảm số lần gọi hàm
function debounce(func, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
}
    // Bắt sự kiện click trên popup
    popupdictionary.addEventListener("click", async function() {
        var element = event.target;
        if (element.classList.contains("close-dict")) {
            // Đóng popup
            console.log("Close popup");
            popupdictionary.style.display = "none";
        } else if (element.classList.contains("lln-dict-speak")) {
            speakWord();
        } else {
            //click vào từng từ => dịch từ đó
		try{
		var wordKey = element.getAttribute("data-word-key");
		    canclose = !1;
		    await Aa(wordKey) && debounce(openPopup(wordKey, x, y),50);
		   setTimeout(function(){canclose = !0;}, 500);
		}catch(e){}
             console.log("click popup");
        }
    });

// Bắt sự kiện click ngoài popup
document.addEventListener("click", function(event) {
    // Kiểm tra xem có phải là click trên popup hay không
    var isClickInside = popupdictionary.contains(event.target);
    // Nếu không phải
    if (!isClickInside && canclose) {
        // Đóng popup
        popupdictionary.style.display = "none";
    }
});
}

async function getAudio(word, lang) {
    var a = await fetch(`https://lb.dioco.io/base_cached_getDictTts_3?lang=${lang}&text=${word}`);
    var b = await a.json();
    if (b && b.status == "success") {
        localStorage.setItem("audiotrack", b.data);
        console.log("Get audio success.")
    } else {
        localStorage.setItem("audiotrack", "");
        console.log("Get audio fail!")
    }
}

async function speakWord() {
    var data = await localStorage.getItem("audiotrack");
    try{
    if (speaking) {
        var snd = new Audio(data);
        speaking = !1;
        await snd.play();
        console.log("play sound");
        setTimeout(function() {
            speaking = !0
        }, 1000);
    }
   }catch(e){}
}

async function getContent(word, sl, tl) { // hear, en, vi
    var html;
    var a = await fetch(`https://lb.dioco.io/base_dict_getFullDict_6?form=${word}&lemma=&sl=${sl}&tl=${tl}`);
    var b = await a.json();
    if (b && b.status == "success") {
    await getAudio(word, "en");
        var data = b.data;
        // các nghĩa khác
        // nghĩa chính
        var m = l(data.rawDictData.ms_form); // danh sách nghĩa theo tần suất
        var t = ae(data.rawDictData.d_lemma); // danh sách nghĩa khác
	var k = getWordExamples(data.wordExamples); // danh sách câu mẫu
	console.log(k)

        html = `<div class="lln-dict-section-contextual"><div class="lln-dict-contextual">
         <span class="lln-hover-dict-freq-wrap in-full-dict" title="English"><img src="${imgsrc}" style="width:20px; height:20px;"></span>
        <span style="color: rgb(189, 189, 0); font-weight: bold;"> ${word}</span> <br>
        <span class="lln-dict-contextual-trans">${data.rawDictData.chatgpt_form.join(", ")}</span></div></div>
        <div class="lln-dict-section-full"><div style="padding-bottom: 3px;">${ab(t,m && m[0])}</div></div>
	<div class="lln-dict-section-examples"><div class="lln-word-examples">
        <div class="lln-word-examples-title">Examples: <a style="color: inherit; text-decoration: underline;" target="_blank" href="https://tatoeba.org/en/sentences/search?query=${word}">Tatoeba</a></div>${getWordExamplesHtml(k)}</div></div>`;
   } else {
        html = `<div class="lln-dict-center">Error loading data.</div>`;
    }
    defineword.innerHTML = html;
}
// Làm sạch từ khoá
function Aa(s){
	return s.replace(/\.|,|;|:|?|\(|\)|"/g, "").trim().toLowerCase();
}

// tạo example
function getWordExamples(t) {
    if (null == t) return [];
    const e = Object.keys(t);
    var n = [];
    return e.forEach(e => {
        t[e].forEach(t => {
            n.push({
                text: t.text,
                meaning: t.translation.text
            })
        })
    }), n
}
function sp(e) {
    let l = e.split(" "),
        n = [];
    for (let e = 0; e < l.length; e++) {
        n.push(`<span data-token-index="${e}" data-word-key="${Aa(l[e])}" data-underline-color="C0" class="lln-word" style="color: #9cffcd;">${l[e]}</span>`)
    }
    return n.join(" ")
}
function getWordExamplesHtml(l) {
    var t = "";
    return l.forEach(l => {
        t += `<div class="lln-word-example lln-sentence-wrap lln-hover-tooltip bottom"><div class="lln-sub-text">${sp(l.text)}</div><span class="tt">${l.meaning}</span></div>`
    }), t;
}

// tạo danh sách nghĩa khác nhau
function ab(e, m) {
    var a = "";
    var pos = ""
    e.forEach(s => {
	s.pos == void 0 ? poss = (m&& m.posTag) : poss = s.pos;
        a += `<div style="padding: 1px 0; color: #fffa;"><span style="opacity: 0.33; font-style: italic; margin-right: 5px;">(${shorttype(poss)})</span> <span style="font-size: 1em;">${s.translation}</span></div>`;
    });
    return a;
}
// loading
function waiting() {
    defineword.innerHTML = `<div class="lln-modal-content" style="width: 60px; height: 65px;height: 65px;margin: auto;margin-top: 150px;display:flow;"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></div>`;
}

// hỗ trợ
function l(e) {
    //return e ? e[0].translations.map(e => e.displayTarget) : []
    return e ? e[0].translations : []
}
// lấy danh sách nghĩa khác
function ae(e) {
    if (void 0 == e) return [];
    return e.dict ? e.dict.map(e => ({
        pos: e.pos,
        baseForm: e.baseForm,
        translation: e.translations.join(", ")
    })) : [e.trans]
}
// rút ngắn loại từ
function shorttype(e) {
    if (void 0 === e) return "";
    return {
        noun: "noun",
        propn: "noun",
        verb: "verb",
        aux: "verb",
        modal: "verb",
        adjective: "adj.",
        adj: "adj.",
        "adj.": "adj.",
        adv: "adv.",
        "adv.": "adv.",
        adverb: "adv.",
        particle: "part.",
        prt: "part.",
        part: "part.",
        conjunction: "conj.",
        conj: "conj.",
        cconj: "conj.",
        sconj: "conj.",
        "conj.": "conj.",
        pronoun: "pron.",
        pron: "pron.",
        "pron.": "pron.",
        preposition: "prep.",
        prep: "prep.",
        pre: "prep.",
        "pre.": "prep.",
        adp: "prep.",
        determiner: "det.",
        det: "det.",
        "det.": "det.",
        article: "det."
    } [(e || "").toLowerCase()] || ""
}

