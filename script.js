let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages 
    this.read = read
}

const newBookBtn = document.querySelector('.new-book')

const modal = document.querySelector('.modal')

const overlay = document.querySelector('.overlay')

const form = document.querySelector('form')

const mainContent = document.querySelector('.main-content')

// Modal function

function openModal() {
    modal.classList.add('active')
    overlay.classList.add('active')      
}

function closeModal() {
    modal.classList.remove('active')
    overlay.classList.remove('active')
    form.reset()
}

newBookBtn.addEventListener('click', openModal)

overlay.addEventListener('click', closeModal)

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.read === undefined) {
        formProps.read = 'no' 
    }

    myLibrary.push(new Book(formProps.title, formProps.author, formProps.pages, formProps.read))
    closeModal()
    showBook()
})

// Display function

function showBook() {
    document.querySelector('.main-content').innerHTML = ''

    for (book of myLibrary) {
        let titleNoSpaces = book.title.replaceAll(' ', '-')

        const bookmark = document.createElement('div')
        mainContent.append(bookmark)
        bookmark.classList.add('bookmark')
        if (book.read === 'yes') {
            bookmark.style.backgroundColor = '#65a30d'
        } else {
            bookmark.style.backgroundColor = '#dc2626'
        }
        
        const card = document.createElement('div')
        bookmark.append(card)
        card.classList.add('card')
    
        const content = document.createElement('div')
        card.append(content)
        content.classList.add('content')
        
        const h1 = document.createElement('h1')
        content.append(h1)
        h1.textContent = `${book.title}`
    
        const authorP = document.createElement('p')
        content.append(authorP)
        authorP.textContent = `Author: ${book.author}`
    
        const pagesP = document.createElement('p')
        content.append(pagesP)
        pagesP.textContent = `Pages: ${book.pages}`
        
        const toggleContainer = document.createElement('div')
        card.append(toggleContainer)
        toggleContainer.classList.add('toggle-container')
    
        const checkbox = document.createElement('input')
        toggleContainer.append(checkbox)
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('name', `toggle-${titleNoSpaces}`)
        checkbox.setAttribute('id', `toggle-${titleNoSpaces}`)
        if (book.read === 'yes') {
            checkbox.setAttribute('checked', '')
        }
        handleCheckbox(book, bookmark, checkbox)
    
        const slidingGroove = document.createElement('div')
        toggleContainer.append(slidingGroove)
        slidingGroove.classList.add('sliding-groove')
    
        const label = document.createElement('label')
        toggleContainer.append(label)
        label.classList.add('toggle-label')
        label.setAttribute('for', `toggle-${titleNoSpaces}`)
    
        const p = document.createElement('p')
        label.append(p)
        p.textContent = 'Read?'
        p.classList.add('label-text')
        
        const deleteBookBtn = document.createElement('button')
        card.append(deleteBookBtn)
        handleDeleteBtn(book, deleteBookBtn)

        const img = document.createElement('img')
        deleteBookBtn.append(img)
        img.setAttribute('src', './assets/close-thick.png')
        img.setAttribute('alt', 'A cancel icon')
    }
}

// Helper functions

function handleDeleteBtn(book, btn) {
    btn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1)
        showBook()
    })
}

function handleCheckbox(book, bookmark, checkbox) {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            book.read = 'yes'
        } else {
            book.read = 'no'
        }
        showBook()
    })
}
