console.log('salut')
class Carousel {

    /**
     * @param {HTMLElement} element
     * @param {Object} options.slidesToScroll Nombre d'éléments à faire défiler
     * @param {Object} options.slidesVisible Nombre d'éléments visible dans un slide
     * @param {boolean} options.loop Doit-on boucler en fin de carousel
     */
    constructor (element, option = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        $this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild($this.container)
        this.element.appendChild(this.root)
        $this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            $this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
    }

    /**
     * Appliques les bonnes dimensions aux éléments du carousel
     */
    setStyle () {
        let ratio = this.items.length /this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__next')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }

    next () {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentItem - this.options.slidesToScroll)
    }

    /**
     * Déplace le carousel vers l'élément ciblé
     * @param {number} index
     */
    gotoItem (index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
            index = 0
        }
        let translatX = index * - 100 / this.items.length
        this.container.style.transform = 'translated3d(' + translatX + '%, 0, 0)'
        this.currentItem = index
    }

    /**
     *
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }


}

document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('#carousel1'), {
        slidesVisible: 3,
        slidesToScroll: 2
    })

    new Carousel(document.querySelector('#carousel2'), {
        slidesVisible: 2,
        slidesToScroll: 2
    })

    new Carousel(document.querySelector('#carousel3'))

})