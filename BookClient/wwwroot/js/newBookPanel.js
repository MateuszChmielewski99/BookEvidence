class NewBookPanel{
    _listeners = [];

    constructor() {
        this._initButtons()
    }

    addEventListener(listener) {
        this._listeners.push(listener)
    }

    _initButtons() {
        let AddButton = document.getElementById('AddBtn')
        
        AddButton.addEventListener('click', e => {
            let nameInput = document.querySelector('#AuthorName')
            let titleInput = document.querySelector('#Title')
            let amountInput = document.querySelector('#Amount')
            this._reiseNewBookEvent({
                name:nameInput.value,
                title:titleInput.value,
                amount:amountInput.value
            })
            nameInput.value = ""
            titleInput.value = ""
            amountInput.value = ""
        })
    }

    _reiseNewBookEvent(book) {
        this._listeners.forEach(s => {
            s.newBookAdded(book)
        })
    }
}