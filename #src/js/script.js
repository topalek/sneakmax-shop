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
