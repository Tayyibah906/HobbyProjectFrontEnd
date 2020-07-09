const requestData = XMLHttpRequest();
const params = new URLSearchParams(window.location.search);

function postComic() {
    document.getElementById("comicForm").addEventListener("submit", function(event)){
        event.preventDefault();
        const comic = {};
        comic.title = this.title.value;
        comic.writer = this.writer.value;
        comic.artist = this.artist.value;
        comic.publisher = this.publisher.value;
        comic.issue = this.issue.value;
        axios.post("http://localhost:8080/hobby/createComic", comic)
            .then(response => output.innerText = res.comic)
            .catch(error => console.log(error));
    };
    let insertmsg = document.querySelector(".insertmsg");
    getMsg(flag, insertmsg);
};

function getComic() {
    const comicOutput = document.getElementById('comicOutput');
    axios.get('http://localhost:8080/hobby/getAll')
        .then(res => {
            comicOutput.innerText = "";
            res.data.forEach((comic, i) => {
                const comicDiv = makeElement('div', '', comicOutput);
                comicDiv.id = 'comic' + i;
                comicDiv.addEventListener('click', function () {
                    window.location = './index.html?id=' + comic.id;
                });
                makeElement('h6', comic.title, comicDiv);
                makeElement('p', `writer: ${comic.writer}`, comicDiv);
                makeElement('p', `Cover Artist: ${comic.artist}`, comicDiv);
                makeElement('p', `publisher: ${comic.publisher}`, comicDiv);
                makeElement('p', `issue: ${comic.issue}`, comicDiv);
                makeElement('p', `universe: ${comic.universe}`, comicDiv);
            });
        })
        .catch(err => console.log(err));
};

function makeElement(eleType, text, appendTo) {
    const element = document.createElement(eleType);
    element.innerText = text;
    appendTo.appendChild(element);
    return element;
};

function putComic() {
    document.getElementById("comicForm").addEventListener("submit", function(event)){
        event.preventDefault();
        const comic = {};
        comic.title = this.title.value;
        comic.writer = this.writer.value;
        comic.artist = this.artist.value;
        comic.publisher = this.publisher.value;
        comic.issue = this.issue.value;
        axios.put("http://localhost:8080/hobby/updateComic", comic)
            .then(response => output.innerText = res.comic)
            .catch(error => console.log(error));
    };
    let updatemsg = document.querySelector(".updatemsg");
      getMsg(get, updatemsg);
};

document.getElementById('delete-button').addEventListener("click", function(){
    axios.delete("http://localhost:8080/hobby/deleteComic" + document.getElementById("input-delete").value)
    .then(response => output.innerText = res.comic)
    .catch(error => console.log(error));

    let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
});
