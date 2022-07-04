class Usuario{
    constructor(id, nombre, apellido, userName, password, token, tokenExpirationDate){
        this.id = id;
        this.nombre = nombre; 
        this.apellido = apellido;
        this.userName = userName;
        this.password = password;
        this.token = token;
        this.tokenExpirationDate = tokenExpirationDate;
    }
}
export default Usuario;