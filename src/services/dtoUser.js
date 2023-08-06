class DtoUser {
    constructor({ id, name, email, is_activated}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isActivated = is_activated;
    }
}

module.exports = DtoUser;