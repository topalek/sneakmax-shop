@@include('./nouislider.min.js')
@@include('./quiz.js')

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
  const inputs = [minInput,maxInput];

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

  slider.noUiSlider.on('update',(values, handle)=>{
    inputs[handle].value = Math.round(values[handle])
  })

  const setRangeSlider  = (i, value) => {
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

class Accordion{
  constructor(el){
    this.$el = el
    this.title = el.querySelector('.faq__item--title')
    this.content = el.querySelector('.faq__item--content')
    this.events()
  }
  events(){
    console.log('events');
    this.$el.addEventListener('click',e=>{
      this.$el.classList.toggle('active')
      if (this.$el.classList.contains('active')) {
        this.open()
      }else{
        this.close()
      }
    })
  }
  open(){
    this.content.style.maxHeight = this.content.scrollHeight *2 +"px";
  }
  close(){
    this.content.style.maxHeight = null;
  }
}
const faqItems = document.querySelectorAll('.faq__item')

faqItems.forEach(faq =>{
  new Accordion(faq)
})

ymaps.ready(init);

function init(){
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