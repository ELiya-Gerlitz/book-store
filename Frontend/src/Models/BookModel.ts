
class BookModel{
    public bookId: number
    public name: string
    public price: number
    public stock: number
    public image: FileList
    public imageName: string

    // Extra field due to server JOIN:

    public genreName: string

}

export default BookModel