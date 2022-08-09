@@include('./nouislider.min.js')
@@include('./quiz.js')
@@include('./products.js')

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

const slider = document.getElementById("slider");
if (slider != "undefined") {
  const minInput = document.querySelector('input[name="min"]');
  const maxInput = document.querySelector('input[name="max"]');
  const inputs = [minInput, maxInput];

  let min = parseInt(minInput.value);
  let max = parseInt(maxInput.value);
  noUiSlider.create(slider, {
    start: [min, max],
    connect: true,
    range: {
      min: min,
      max: max,
    },
  });

  slider.noUiSlider.on('update', (values, handle) => {
    inputs[handle].value = Math.round(values[handle])
  })

  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    slider.noUiSlider.set(arr);
  };

  inputs.forEach((el, index) => {
    el.addEventListener("change", (e) => {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}

class Accordion {
  constructor(el) {
    this.$el = el
    this.title = el.querySelector('.faq__item--title')
    this.content = el.querySelector('.faq__item--content')
    this.events()
  }
  events() {
    console.log('events');
    this.$el.addEventListener('click', e => {
      this.$el.classList.toggle('active')
      if (this.$el.classList.contains('active')) {
        this.open()
      } else {
        this.close()
      }
    })
  }
  open() {
    this.content.style.maxHeight = this.content.scrollHeight * 2 + "px";
  }
  close() {
    this.content.style.maxHeight = null;
  }
}
const faqItems = document.querySelectorAll('.faq__item')

faqItems.forEach(faq => {
  new Accordion(faq)
})

ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 7
  });
}
// (function(){
//         new InstagramFeed({
//             'username': 'kino_teatr_sapfir',
//             'container': document.querySelector(".insta__content"),
//             'display_profile': false,
//             'display_biography': false,
//             'display_gallery': true,
//             'display_captions': true,
//             'max_tries': 8,
//             'callback': (data)=>{
//               // data = JSON.parse(data)
//               console.log(typeof data)
//             },
//             'styling': false,
//             'items': 5,
//             // 'items_per_row': 4,
//             // 'margin': 1,
//             'lazy_load': true,
//             'on_error': console.error
//         });
//     })();

class Modal {
  constructor(options) {
    let defaultOptions = {
      beforeOpen: (e) => {
        console.log('beforeOpen')
      },
      afterOpen: (e) => {
        console.log('afterOpen')
      },
      beforeClose: (e) => {
        console.log('beforeClose')
      },
      afterClose: (e) => {
        console.log('afterClose')
      },
    }
    this.options = Object.assign(defaultOptions, options)
    this.beforeOpen = this.options.beforeOpen
    this.afterOpen = this.options.afterOpen
    this.beforeClose = this.options.beforeClose
    this.afterClose = this.options.afterClose
    this.modal = document.querySelector('.modal')
    this.body = document.querySelector('body')
    this.trigger = false
    this.speed = 300
    this.animation = false
    this.modalContainer = false
    this.events()
  }
  beforeOpen(callback) {
    const event = new Event('beforeOpen');
    this.modal.dispatchEvent(event);
    callback()
  }
  afterOpen(callback) {
    const event = new Event('afterOpen');
    this.modal.dispatchEvent(event);
    callback()
  }
  beforeClose(callback) {
    const event = new Event('beforeClose');
    this.modal.dispatchEvent(event);
    callback()
  }
  afterClose(callback) {
    const event = new Event('afterClose');
    this.modal.dispatchEvent(event);
    callback()
  }
  open(callback) {
    let padding = window.innerWidth - document.documentElement.clientWidth + 'px'
    this.body.style.paddingRight = padding
    this.body.classList.add('disable-scroll')
    this.modal.classList.add('open')
    callback()
  }
  close(callback) {
    this.body.setAttribute('style', '')
    this.body.classList.remove('disable-scroll')
    this.modal.classList.remove('open')
    callback()
  }
  events() {
    document.addEventListener('click', e => {
      const el = e.target
      if (el.hasAttribute('data-toggle') && el.dataset.toggle == 'modal') {
        this.beforeOpen(this.open(this.afterOpen))
      }
      if (el.hasAttribute('data-dismiss') && el.dataset.dismiss == 'modal') {
        this.beforeClose(e)
        this.close()
        this.afterClose(e)
      }
    })
  }
}
const modal = new Modal()
document.querySelector('.modal').addEventListener('beforeOpen',(e)=>{
  console.dir(e)
})

function slideUp(el, duration = 500) {
  if (!el.classList.contains('slide')) {
    el.classList.add('slide')
    const ch = el.clientHeight,
      sh = el.scrollHeight;
      el.style.overflow = 'hidden'
      el.style.transition = `all ${duration}ms ease-in-out`;
      isCollapsed = !ch,
      noHeightSet = !el.style.height;
    el.style.height = "0px";
    setTimeout(() => {
      el.classList.add('slide')
      // el.removeAttribute('style')
    }, duration);
  }
   
}
function slideDown(el, duration = 500) {
    if (!el.classList.contains('slide')) {
    el.classList.add('slide')
    const ch = el.clientHeight,
      sh = el.scrollHeight;
      el.style.overflow = 'hidden'
      el.style.transition = `all ${duration}ms ease-in-out`;
      isCollapsed = !ch,
      noHeightSet = !el.style.height;
    el.style.height = sh+"px";
    setTimeout(() => {
      el.classList.add('slide')
      // el.removeAttribute('style')
    }, duration);
  }
}

// function slideToggle(params) {
//   const ch = el.clientHeight,
//       sh = el.scrollHeight,
//       isCollapsed = !ch,
//       noHeightSet = !el.style.height;

//     el.style.height = (isCollapsed || noHeightSet ? sh : 0) + "px";
//     if (noHeightSet) return slidetoggle.call(this);
// }

// function slidetoggle() {

//   document.querySelectorAll(this.getAttribute('data-slidetoggle')).forEach(el => {
//     const ch = el.clientHeight,
//       sh = el.scrollHeight;
//       el.style.overflow = 'hidden'
//       el.style.transition = `all 500ms ease-in-out`;
//       isCollapsed = !ch,
//       noHeightSet = !el.style.height;
//       console.log(noHeightSet)
//     el.style.height = (isCollapsed || noHeightSet ? sh : 0) + "px";
//     if (noHeightSet) return slidetoggle.call(this);
//   });
// }
// function slie(params) {
  
// }
function slidetoggle(e) {
  const el = document.querySelector(e.target.getAttribute('data-slidetoggle'))
  const toggle =e.target
  console.log(el)
  if (toggle.classList.contains('open')) {
    slideUp(el)
    toggle.classList.remove('open')
  }else{
    slideDown(el)
    toggle.classList.add('open')
  }
}
document.querySelectorAll("[data-slidetoggle]").forEach(el => el.addEventListener('click', slidetoggle));