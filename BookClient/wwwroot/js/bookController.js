class BookController {
    _newBookPanel = null
    _bookListPanel = null
    _service = null
    _id = -1

    constructor(args) {
        this._service = new BookService(args.serviceUrl)
        this._newBookPanel = new NewBookPanel()
        this._bookListPanel = new BookListPanel()

        let _this = this

        this._newBookPanel.addEventListener(new class {
            newBookAdded(e) {
                let data = {}
                data.author_last_name = e.name
                data.title = e.title
                data.amount = e.amount


                _this._service.post(data)
            }

            bookEdited(e) {
                let data = {}
                data.id = _this._id
                data.author_last_name = e.name
                data.title = e.title
                data.amount = e.amount

                _this._service.put(data.id, data)
                _this._newBookPanel.hideButtons()
            }
        })

        this._bookListPanel.addEventListener(new class {
            bookRemoved(e) {
                _this._service.delete(e.id)
            }

            bookEditing(e) {
                _this._id = e.id
            }

        })

            this._service.addEventListener(new class {
                getResponseReady(e){
                    JSON.parse(e.data).forEach(i => {
                        _this._bookListPanel.addNewBook({
                            id: i.id,
                            name: i.author_last_name,
                            title: i.title,
                            amount: i.amount
                        })
                    })
                }

                postResponseReady(e) {
                    _this._bookListPanel.addNewBook(e)
                }

                deleteResponseReady(e) {

                }

                putResponseReady(e) {
                        _this._bookListPanel.editBook(e)
                    
                }
         })

        this._service.get()

    }

}