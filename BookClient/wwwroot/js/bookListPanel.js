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

        idColumn.innerText = book.id
        authorNameColumn.innerText = book.author_last_name
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

        newRow.classList.remove('d-none')
        grid.appendChild(newRow)

    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    _raiseBookRemovedEvent(e) {
        this._listeners.forEach(s => {
            s.bookRemoved(e)
        })
    }

}