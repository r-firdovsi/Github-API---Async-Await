const githubForm     = document.getElementById("github-form");
const nameInput      = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers      = document.getElementById("last-users");

const github = new Github();
const ui     = new UI();

githubForm.addEventListener("submit", getData);
clearLastUsers.addEventListener("click", clearAllSearched);
document.addEventListener("DOMContentLoaded", getAllSearched);


function getData(e) {
    let userName = nameInput.value.trim();
    if (userName === "") {
        alert("Lutfen gecerli bir kullanici adi girin");
    } else {
        github.getGithubData(userName)
        .then(response => {
            if(response.user.message === "Not Found") {
                ui.showError("Kullanici Bulunamadi");
            } else {
                ui.addSearchedUserToUI(userName);

                Storage.addSearchedUserToStorage(userName);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();  //Input Temizlenmesi
    e.preventDefault();
}

function clearAllSearched() {
    //Tum arananlari temizle

    if(confirm("Silmek Istediyinizden Eminmisiniz ?")) {
        Storage.clearAllSearchedUsersFromStorage(); //Storage den temizlenecek
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched() {
    //arananlari storage dan al ve Ui ya ekle

    let users =  Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`;
    })

    lastUsers.innerHTML = result;
}