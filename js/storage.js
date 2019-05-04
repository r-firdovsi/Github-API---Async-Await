class Storage {
    
    
    static getSearchedUsersFromStorage() {
        //Tum Kullanicilarin Alinmasi

        let users;

        if(localStorage.getItem("searched") === null) {
            users =[];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;
    }

    static addSearchedUserToStorage(username) {
        //Kullanici ekle

        let users = this.getSearchedUsersFromStorage();

        if(users.indexOf(username) === -1) {
            users.push(username);
        }

        localStorage.setItem("searched", JSON.stringify(users));

    }

    static clearAllSearchedUsersFromStorage() {
        // Tum kullaniciliarin Silinmesi

        localStorage.removeItem("searched");
    }
}