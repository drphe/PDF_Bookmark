/*================== DATA STRUCTURE ==================  */
//"bookmarks":[{ book: book_name, path: url, page: [0], date: ["10-10-2010"]  },{ book: book_name, path: url, page: [0,1,2], date: ["10-10-2010"] }]
document.addEventListener("DOMContentLoaded", function() {
    var alpha = document.getElementById("alpha");
    alpha.addEventListener("click", function() {
        if (
            $("#alpha").hasClass("fa-sort-alpha-up") &&
            $("#alpha").hasClass("text-primary")
        ) {
            location.reload();
        } else {
            $("#alpha").toggleClass("fa-sort-alpha-up");
            $("#alpha").toggleClass("fa-sort-alpha-down");
            $("#alpha").addClass("text-primary");
            $("#alpha").removeClass("text-muted");

            if ($("#alpha").hasClass("fa-sort-alpha-down")) {
                orderByName(1);
            } else {
                orderByName(-1);
            }
        }
    });

    function orderByName(order) {
        var accordion = $("#accordion");
        var arr = $.makeArray(accordion.children());

        orderedArray = arr.sort(function(a, b) {
            var textA = a.id.toLowerCase();
            var textB = b.id.toLowerCase();
            if (textA < textB) return -1 * order;
            if (textA > textB) return 1 * order;
            return 0;
        });
        accordion.empty();
        $.each(orderedArray, function() {
            accordion.append(this);
        });
    }


    // Delete all the stored bookmarks
    var deleteAll = document.getElementById("deleteAll");
    deleteAll.addEventListener("click", function() {
        var confirmed = confirm("Bạn có chắc chắn muốn hoá hết bookmark?");
        if (confirmed) {
            $("#accordion").empty();
            chrome.storage.sync.remove("bookmarks");
        }
    });

    // Creates and stores the bookmark in local storage
    var addBook = document.getElementById("add");
    addBook.addEventListener("click", addBookmark);
});

function alertInfo(x = "Đã thêm Bookmark!") {
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

// add new bookmark
function addBookmark() {
    add = true;
    addGroup = false;
    chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
            currentWindow: true
        },
        function(tabs) {
            var url = tabs[0].url;
            // Check if it is a pdf
            if (url.includes(".pdf")) {
                book_name = url.split("/").pop().split(".pdf", 1);
                url = url.split("#").shift();
                var pageNumber = document.getElementById("pageNumber").value;
                var today = new Date();
                var creationDate =
                    today.getDate() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    today.getFullYear();
                if (pageNumber == "") {
                    pageNumber = 0;
                }
                chrome.storage.sync.get("bookmarks", function(items) {
                    if (items.bookmarks === undefined || items.bookmarks === null) {
                        chrome.storage.sync.set({
                            bookmarks: [{
                                book: book_name,
                                path: url,
                                page: [pageNumber],
                                date: [creationDate],
                            }, ],
                        });
                        reloadData();
                        alertInfo();
			console.log('1')
                    } else {
                        // We iterate through all of the bookmarks stored in the JSON object
                        for (key in items.bookmarks) {
                            // We check if the bookmark already exists showing a message
                            if (JSON.stringify(items.bookmarks[key].book) == JSON.stringify(book_name)) {
                                if (!items.bookmarks[key].page.includes(pageNumber)) {
                                    items.bookmarks[key].date.push(creationDate);
                                    items.bookmarks[key].page.push(pageNumber);
                                    chrome.storage.sync.set({
                                        bookmarks: items.bookmarks,
                                    });
                                    reloadData();
				    alertInfo();
                                    add = false;
                                    break;
                                } else {
                                    alert(
                                        "Bookmark trong tài liệu: " +
                                        decodeURI(book_name) +
                                        "\n đã tồn tại rồi!"
                                    );
                                    add = false;
                                    break;
                                }
                            }
                        }
                        if (add) {
                            items.bookmarks.push({
                                book: book_name,
                                path: url,
                                page: [pageNumber],
                                date: [creationDate],
                            });
                            chrome.storage.sync.set({
                                bookmarks: items.bookmarks,
                            });
                            reloadData();
			    alertInfo();
                        }
                    }
                });
            } else {
                alert("Trang hiện tại không phải tài liệu PDF!")
            }
        }
    );
}

// Shows all the stored bookmarks when we open the extension
document.body.onload = function() {
    reloadData();
};

function addItemToListGroup(path, pages, book, date) {
    var orderedBookmark = sortPages(pages, "alphabetical");
    // To mantain open the accordion data-parent="#accordion"
    groupHTML =
        '<div id="' +
        book +
        'Id" class="card"><div class="card-header" id="' +
        book +
        'Header"><h5 class="mb-0" data-toggle="tooltip" data-placement="top" title="' +
        decodeURI(book) +
        '"><button class="btn accordion-btn col-11" data-toggle="collapse"' +
        'data-target="#' +
        book +
        '" aria-expanded="false" aria-controls="' +
        book +
        '"><i class="far fa-bookmark mr-2 text-file"></i>' +
        nameShortener(decodeURI(book)) +
        '</button><span class="badge badge-danger col-1">' +
        pages.length +
        "</span></h5></div>" +
        '<div id="' +
        book +
        '" class="collapse custom-border" aria-labelledby="' +
        book +
        'Header"><div class="card-body row card-padding w-auto">';
    for (page in orderedBookmark) {
        groupHTML =
            groupHTML +
            '<a href="' +
            path +
            "#page=" +
            orderedBookmark[page] +
            '" class="list-group-item list-group-item-action col-4 mb-2 ml-3">' +
            '<i class="far fa-file-alt mr-2 text-file"></i>' +
            "<b>Trang " +
            orderedBookmark[page] +
            "</b></a>" +
            '<button class="btn btn-danger ml-2 mb-2 delete-button" id="' +
            book +
            ",,," +
            orderedBookmark[page] +
            '")><i class="fas fa-trash"></i></button>' +
            '<div class="col-6 text-muted pt-2">Ngày lưu: ' +
            date[pages.indexOf(orderedBookmark[page])] +
            "</div>";
    }
    $("#accordion").append(groupHTML + "</div>" + "</div>" + "</div>");
}

function deleteBookmark(book, page) {
    chrome.storage.sync.get("bookmarks", function(items) {
        for (key in items.bookmarks) {
            if (items.bookmarks[key].book == book) {
                if (items.bookmarks[key].page.length > 1) {
                    var index = items.bookmarks[key].page.indexOf(page);
                    items.bookmarks[key].date.splice(index, 1);
                    items.bookmarks[key].page.splice(index, 1);
                } else {
                    items.bookmarks.splice(key, 1);
                }
                chrome.storage.sync.set({
                        bookmarks: items.bookmarks
                    },
                    location.reload()
                );
                break;
            }
        }
    });
}

function sortPages(bookmarks, orderBy) {
    aux = bookmarks
    if (bookmarks.length != 0) {
        aux = bookmarks.slice();

        if (orderBy == "alphabetical") {
            aux = aux.sort((a, b) => a - b);
        }
    }

    return aux;
}

function reloadData() {
    // Reset all the data
    $("#accordion").empty();

    // Read and display all the stored data from the API
    chrome.storage.sync.get("bookmarks", function(items) {
        for (key in items.bookmarks) {
            addItemToListGroup(
                items.bookmarks[key].path,
                items.bookmarks[key].page,
                items.bookmarks[key].book,
                items.bookmarks[key].date
            );
        }
        // Add event to listen delete button
        var elements = document.getElementsByClassName("delete-button");
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener(
                "click",
                function() {
                    deleteBookmark(this.id.split(",,,")[0], this.id.split(",,,")[1]);
                    location.reloadData();
                },
                false
            );
        }

        // Open new url with Chrome API
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            if (links[i] != undefined) {
                links[i].addEventListener("click", function(e) {
                    chrome.tabs.create({
                        url: "" + this.getAttribute("href")
                    });
                });
            }
        }
    });
}

function nameShortener(name) {
    name = String(name);
    if (name.length > 35) {
        name =
            name.substring(0, 20) +
            "<b class='text-secondary'>[...]</b>" +
            name.substring(name.length - 20);
    }
    return name;
}