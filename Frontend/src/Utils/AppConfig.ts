class AppConfig{
    public AllBooksURL= `http://localhost:3001/api/books/`
    public imgURL= `http://localhost:3001/api/books/images/`
    public registerURL= `http://localhost:3001/api/auth/register/`
    public loginURL= `http://localhost:3001/api/auth/login/`
}
const appConfig= new AppConfig()
export default appConfig