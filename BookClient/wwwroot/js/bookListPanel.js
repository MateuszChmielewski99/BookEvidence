class BookListPanel {
    _listeners = []

    addNewBook(book) {
        let grid = document.querySelector('#booksContainer')
        let newRow = grid.children[1].cloneNode(true)


        let idColumn = newRow.querySelector('div[data-column-type=\'id\']')
        let authorNameColumn = newRow.querySelector('div[data-column-type=\'lastName\']')
        let titleColumn = newRow.querySelector('div[data-column-type=\'title\']')
        let amountColumn = newRow.querySelector('div[data-column-type=\'amount\']')

        newRow.dataset['rowType'] = 'data'
        newRow.dataset['internalId'] = book.id


        idColumn.innerText = book.id
        authorNameColumn.innerText = book.name
        titleColumn.innerText = book.title
        amountColumn.innerText = book.amount

        let removeAnchor = newRow.querySelector('a[data-action=\'Remove\']')
        removeAnchor.addEventListener('click', e =>
        {
            let idColumn = removeAnchor.parentElement.parentElement.querySelector('div[data-column-type=\'id\']')
            this._raiseBookRemovedEvent({
                id:idColumn.innerText
            })
            removeAnchor.parentElement.parentElement.remove()
        })


        let editAnchor = newRow.querySelector('a[data-action=\'Edit\']')
        editAnchor.addEventListener('click', e =>
        {
            let id = document.getElementById('id')

            let AddButton = document.getElementById('AddBtn')
            AddButton.classList.add('d-none')

            this._showButtons()

            let authorLastNameColumn = editAnchor.parentElement.parentElement.querySelector('div[data-column-type=\'lastName\']')
            let titleColumn = editAnchor.parentElement.parentElement.querySelector('div[data-column-type=\'title\']')
            let amountColumn = editAnchor.parentElement.parentElement.querySelector('div[data-column-type=\'amount\']')
            let idColumn = editAnchor.parentElement.parentElement.querySelector('div[data-column-type=\'id\']')

            // id.dataset['bookId'] = idColumn.innerText

            this._raiseBookEditingEvent({
                id: idColumn.innerText
            })

            let nameInput = document.getElementById('AuthorName')
            let titleInput = document.getElementById('Title')
            let amountInput = document.getElementById('Amount')

            nameInput.value = authorLastNameColumn.innerText
            titleInput.value = titleColumn.innerText
            amountInput.value = amountColumn.innerText

        })

        newRow.classList.remove('d-none')
        grid.appendChild(newRow)

    }

    editBook(book) {

        let grid = document.querySelector('#booksContainer')
        let row = grid.querySelector('div[data-internal-id=\'' + book.id + '\']')

        let authorLastNameColumn = row.querySelector('div[data-column-type=\'lastName\']')
        let titleColumn = row.querySelector('div[data-column-type=\'title\']')
        let amountColumn = row.querySelector('div[data-column-type=\'amount\']')

        authorLastNameColumn.innerHTML = book.author_last_name
        titleColumn.innerHTML = book.title
        amountColumn.innerHTML = book.amount
       
    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    _raiseBookRemovedEvent(e) {
        this._listeners.forEach(s => {
            s.bookRemoved(e)
        })
    }

    _raiseBookEditingEvent(e) {
        this._listeners.forEach(s => {
            s.bookEditing(e)
        })
    }

    _showButtons() {

        let saveBtn = document.getElementById('SaveBtn')
        let cencelBtn = document.getElementById('CencelBtn')
        saveBtn.classList.remove('d-none')
        cencelBtn.classList.remove('d-none')

    }

}