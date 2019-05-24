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

        let SaveButton = document.getElementById('SaveBtn')
        SaveButton.addEventListener('click', e =>
        {

            let id = document.getElementById('id')

            let nameInput = document.querySelector('#AuthorName')
            let titleInput = document.querySelector('#Title')
            let amountInput = document.querySelector('#Amount')



            this._reiseBookEditingSaveEvent({
                id: id.dataset['bookId'],
                name: nameInput.value,
                title: titleInput.value,
                amount: amountInput.value
            })



            nameInput.value = ""
            titleInput.value = ""
            amountInput.value = ""

          

        })

        let cencelButton = document.getElementById('CencelBtn')

        cencelButton.addEventListener('click', e => { 

            let nameInput = document.querySelector('#AuthorName')
            let titleInput = document.querySelector('#Title')
            let amountInput = document.querySelector('#Amount')

            this.hideButtons()

            nameInput.value = ""
            titleInput.value = ""
            amountInput.value = ""

        })

    }


    hideButtons() {

        let saveBtn = document.getElementById('SaveBtn')
        let cencelBtn = document.getElementById('CencelBtn')
        let addBtn = document.getElementById('AddBtn')

        addBtn.classList.remove('d-none')
        saveBtn.classList.add('d-none')
        cencelBtn.classList.add('d-none')

    }

    _reiseNewBookEvent(book) {
        this._listeners.forEach(s => {
            s.newBookAdded(book)
        })
    }

    _reiseBookEditingSaveEvent(book) {
        this._listeners.forEach(s => {
            s.bookEdited(book)
        })
    }

    
    
}