let logout = document.querySelector(".logout");
let input = document.querySelector(".search");
let bookmark_close = document.querySelector(".bookmarks-close");
let bookmark_open = document.querySelector(".bookmarks-show");
let books_list = document.querySelector(".books-dad");
let form = document.querySelector("#form");
let bookmarks = document.querySelector(".bookmarks");
let modal_content = document.querySelector(".modal-content");
let book_count = 0;
var arr_books = [];
var arr_bookmarks = [];

let email = "eve.holt@reqres.in";
let password = "cityslicka";

if (
  localStorage.getItem("email") != email ||
  localStorage.getItem("password") != password
) {
  window.location.replace("../pages/login.html");
}

logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("../pages/login.html");
});

bookmark_close.addEventListener("click", () => {
  document.querySelector(".books-list").style.width = "100%";
  document.querySelector(".bookmarks").style.display = "none";
  document.querySelector(".bookmarks-show").style.display = "block";
  document.querySelector(".result-order").style.display = "flex";
  document.querySelector(".result-order").style.justifyContent =
    "space-between";
  document.querySelector(".book-count").style.marginLeft = "100px";
});

bookmark_open.addEventListener("click", () => {
  document.querySelector(".bookmarks-show").style.display = "none";
  document.querySelector(".books-list").style.width = "80%";
  document.querySelector(".bookmarks").style.width = "20%";
  document.querySelector(".bookmarks").style.display = "block";
  document.querySelector(".result-order").style.display = "block";
  document.querySelector(".book-count").style.marginLeft = "330px";
});

async function getAPI() {
  let res = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=$%7BsearchItem%7D&startIndex=20&maxResults=6"
  );
  let data = await res.json();

  form.addEventListener("submit", (e) => {
    let inputVal = input.value.toLowerCase();

    books_list.innerHTML = "";
    arr_books = [];

    for (i of data.items) {
      let title = i.volumeInfo.title.toLowerCase();
      let isInclude = arr_books.includes(i);
      if (title.includes(inputVal) && isInclude == false) {
        arr_books.push(i);
      }
    }

    book_count = arr_books.length;
    document.querySelector(
      ".book-count"
    ).innerHTML = `Showing ${book_count} Result(s)`;

    document.querySelector(".search-result").style.display = "block";

    if (arr_books.length == 0) {
      let answer = document.querySelector(".search-result");
      answer.innerHTML = "Nothing found";
    } else {
      let answer = document.querySelector(".search-result");
      answer.style.display = "none";
    }

    input.value = "";

    // kitob yaratadi
    arr_books.forEach((element) => {
      let info = element.volumeInfo;
      let card = document.createElement("div");
      let img = document.createElement("img");
      let bg_img = document.createElement("img");
      let name = document.createElement("h3");
      let author = document.createElement("p");
      let date = document.createElement("p");
      let btns = document.createElement("div");
      let bookmark = document.createElement("button");
      let more_info = document.createElement("button");
      let read = document.createElement("a");

      card.id = element.id;
      bg_img.src = "../images/card-bg-img.png";
      img.src = info.imageLinks.thumbnail;
      author.innerHTML = info.authors[0];
      date.innerHTML = info.publishedDate;
      bookmark.innerHTML = "Bookmark";
      bookmark.id = element.id;
      more_info.innerHTML = "More Info";
      read.href = info.previewLink;
      read.innerHTML = "Read";
      more_info.id = element.id;
      read.setAttribute("target", "_blank");

      for (i = 0; i < info.title.length; i++) {
        if (i == 25) {
          break;
        }
        name.innerHTML += info.title[i];
      }

      card.classList.add("card");
      img.classList.add("main-img");
      bg_img.classList.add("bg-img");
      author.classList.add("author");
      btns.classList.add("card-btns");
      bookmark.classList.add("bookmark-btn");
      more_info.classList.add("more-info-btn");
      read.classList.add("read-btn");

      btns.append(bookmark, more_info, read);
      card.append(bg_img, img, name, author, date, btns);
      books_list.appendChild(card);
    });
    e.preventDefault();

    // Bookmark yaratadi
    let bookmarkBtns = document.querySelectorAll(".bookmark-btn");
    bookmarkBtns.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        for (i of data.items) {
          if (i.id == element.id && !arr_bookmarks.includes(i)) {
            arr_bookmarks.push(i);
            let box = document.createElement("div");
            let name = document.createElement("h3");
            let author = document.createElement("p");
            let readBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");
            let readImg = document.createElement("img");
            let deleteImg = document.createElement("img");
            let bm_Btns = document.createElement("div");
            let read_link = document.createElement("a");

            readImg.src = "../images/read.png";
            deleteImg.src = "../images/bookmark-delete.png";
            name.innerHTML = i.volumeInfo.title;
            author.innerHTML = i.volumeInfo.authors[0];
            read_link.href = i.volumeInfo.previewLink;

            box.classList.add("bookmark");
            author.classList.add("bm-author");
            name.classList.add("bm-title");
            readBtn.classList.add("read-btn");
            deleteBtn.classList.add("delete-btn");
            bm_Btns.classList.add("bm-Btns");

            read_link.appendChild(readImg);
            readBtn.appendChild(read_link);
            deleteBtn.appendChild(deleteImg);
            bm_Btns.append(readBtn, deleteBtn);
            box.append(name, author, bm_Btns);
            bookmarks.appendChild(box);
            // localStorage.setItem('bookmarks',arr_books)
            console.log(arr_books);
          }
        }
      });

      // modal yaratadi
      let modals_arr = document.querySelectorAll(".more-info-btn");
      modals_arr.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(".modal").style.display = "block";
          document.querySelector(".modal-content").innerHTML = "";
          for (i of data.items) {
            if (element.id == i.id) {
              let modalHead = document.createElement("div");
              let modalBody = document.createElement("div");
              let modalFooter = document.createElement("div");
              let mdlTitle = document.createElement("h2");
              let mdlImg = document.createElement("img");
              let mdlTxt = document.createElement("p");
              let author = document.createElement("p");
              let author_name = document.createElement("p");
              let publisher = document.createElement("p");
              let plsh_name = document.createElement("p");
              let published = document.createElement("p");
              let published_date = document.createElement("p");
              let category = document.createElement("p");
              let category_name = document.createElement("p");
              let pages = document.createElement("p");
              let pagesCount = document.createElement("p");
              let readBtn = document.createElement("a");
              let closeBtn = document.createElement("button");
              let closeBtnImg = document.createElement("img");
              let main_img = document.createElement("div");

              closeBtnImg.src = "../images/close.svg";
              mdlTitle.innerHTML = i.volumeInfo.title;
              mdlImg.src = i.volumeInfo.imageLinks.thumbnail;
              mdlTxt.innerHTML = i.volumeInfo.description;
              author_name.innerHTML = i.volumeInfo.authors[0];
              published_date.innerHTML = i.volumeInfo.publishedDate;
              category_name.innerHTML = i.volumeInfo.categories[0];
              pagesCount.innerHTML = i.volumeInfo.pageCount;
              plsh_name.innerHTML = i.volumeInfo.publisher;
              readBtn.innerHTML = "Read";
              readBtn.href = i.volumeInfo.previewLink;
              readBtn.target = "_blank";
              author.innerHTML = "Author: ";
              published.innerHTML = "Published: ";
              publisher.innerHTML = "Publishers: ";
              category.innerHTML = "Categories: ";
              pages.innerHTML = "Pages Count: ";

              modalBody.classList.add("modal-Body");
              modalHead.classList.add("modal-Head");
              modalFooter.classList.add("modal-Footer");
              main_img.classList.add("body-img");
              mdlTxt.classList.add("mdl-text");
              closeBtn.classList.add("modal-close");
              console.log(closeBtn);
              author_name.classList.add("mc-value");
              published_date.classList.add("mc-value");
              category_name.classList.add("mc-value");
              pagesCount.classList.add("mc-value");
              plsh_name.classList.add("mc-value");

              main_img.appendChild(mdlImg);
              author.appendChild(author_name);
              published.appendChild(published_date);
              category.appendChild(category_name);
              pages.appendChild(pagesCount);
              publisher.appendChild(plsh_name);
              closeBtn.appendChild(closeBtnImg);
              modalFooter.appendChild(readBtn);
              modalHead.append(mdlTitle, closeBtn);
              modalBody.append(
                main_img,
                mdlTxt,
                author,
                published,
                publisher,
                category,
                pages
              );
              modal_content.append(modalHead, modalBody, modalFooter);
            }
          }
          let modal_close = document.querySelector(".modal-close");
          modal_close.addEventListener("click", () => {
            document.querySelector(".modal").style.display = "none";
          });
        });
      });
    });
  });
}

let res = getAPI();
