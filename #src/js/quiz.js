const quizData = [
  {
    step: 1,
    title: "Какой тип кроссовок рассматриваете?",
    alias: "type",
    items: [
      {
        img: "https://images.ua.prom.st/1956259253_w640_h640_1956259253.jpg",
        item_title: "Беговые кроссовки",
        type: "checkbox",
      },
      {
        img: "https://images.shafastatic.net/291776975",
        item_title: "Баскетбольные кроссовки",
        type: "checkbox",
      },
      {
        img: "https://images.ua.prom.st/2100466104_w640_h640_futbolnye-krossovkikopy-nike.jpg",
        item_title: "Футбольные кроссовки",
        type: "checkbox",
      },
      {
        img: "http://geekville.ru/wp-content/uploads/2021/08/rtr-3-of-3-2.jpg",
        item_title: "Повседневные кроссовки",
        type: "checkbox",
      },
      {
        img: "https://tennis-master.com.ua/uploads/content/2018/10/16/source/13691-13691x.jpg",
        item_title: "Теннисные кроссовки",
        type: "checkbox",
      },
      {
        img: "http://cms.ua-tao.com/storage/blogs/July2020/1.jpg",
        item_title: "Кроссовки для фитнеса",
        type: "checkbox",
      },
    ],
  },
  {
    step: 2,
    title: "Какой размер вам подойдет?",
    alias: "size",
    items: [
      {
        item_title: "менее 36",
        type: "radio",
      },
      {
        item_title: "36-38",
        type: "radio",
      },
      {
        item_title: "39-41",
        type: "radio",
      },
      {
        item_title: "42-44",
        type: "radio",
      },
      {
        item_title: "45 и больше",
        type: "radio",
      },
      {
        img: "/img/quiz-2.jpg",
        item_title: "45 и больше",
        type: "img",
      },
    ],
  },
  {
    step: 3,
    title: "Уточните какие-либо моменты",
    alias: "comment",
    items: [
      {
        item_title: "Введите сообщение",
        type: "textarea",
      },
    ],
  },
  {
    step: 4,
    title: "Получить предложение",
    alias: "contacts",
    items: [
      {
        item_title: "Ваше имя",
        type: "text",
      },
      {
        item_title: "E-mail",
        type: "email",
      },
    ],
  },
];

class Quiz {
  constructor(selector, data = [], options) {
    this.$el = document.querySelector(selector);
    this.data = data;
    this.url = this.$el.getAttribute("action") || "/";
    this.options = {
      nextText: "Next",
      submitText: "Submit",
    };
    this.options = Object.assign({}, this.options, options);
    this.stepCount = data.length;
    this.step = 0;
    this.result = [];
    this.inputs = ["tel", "email", "text", "number", "password"];
    this.init();
    this.events();
  }
  init() {
    this.$el.innerHTML = this.getQuizTemplate(this.data[this.step]);
  }
  events() {
    this.$el.addEventListener("click", (e) => {
      if (e.target == this.$el.querySelector("[data-next]")) {
        this.next();
      }
      if (e.target == this.$el.querySelector("[data-send]")) {
        this.send();
      }
    });
    this.$el.addEventListener("change", (e) => {
      if (e.target.tagName == "INPUT") {
        if (!["checkbox", "radio"].includes(e.target.type)) {
          let inputs = this.$el.querySelectorAll("input");
          inputs.forEach((el) => (el.checked = false));
        }
      }
    });
  }
  next() {
    if (this.step + 1 < this.stepCount) {
      if (!this.isEmpty(this.getDataObj())) {
        this.serialize();
        this.step++;
        this.$el.innerHTML = this.getQuizTemplate(this.data[this.step]);
      }
    }
  }
  async send() {
    if (!this.isEmpty(this.getDataObj())) {
      this.serialize();
      console.log(JSON.stringify(this.result));
      await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(this.result),
        // mode: 'no-cors',
        // credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((result) => console.log(result));
    }
  }
  serialize() {
    const obj = this.getDataObj();
    this.result.push(obj);
    return obj;
  }
  isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }
  getDataObj() {
    let formData = new FormData(this.$el);
    let obj = {};
    for (let [key, value] of formData) {
      if (obj[key] !== undefined) {
        if (!Array.isArray(obj[key])) {
          obj[key] = [obj[key]];
        }
        if (value) {
          obj[key].push(value);
        }
      } else {
        if (value) {
          obj[key] = value;
        }
      }
    }
    return obj;
  }
  getQuizTemplate(data = []) {
    const { step, title, alias } = data;
    const isLastItem = step == this.stepCount;
    const btnText = isLastItem
      ? this.options.submitText
      : this.options.nextText;

    if (isLastItem) {
      this.$el.classList.add('last')
    }
    const itemsHtml = data.items.map((item) => {
      const isCheck =
        !this.inputs.includes(item.type) && item.type !== "textarea";

      let img = item?.img || "";
      if (img) {
        img = `<img class="quiz-item__img" src="${img}" alt="${alias}">`;
      }
      let input = `<input type="${item.type}" class="${
        isCheck ? "custom-checkbox__field" : "quiz-item__input"
      }" name="${
        item.type !== "text" ? item.type : alias
      }" data-valid="false" placeholder="${item.item_title}" value="${
        !this.inputs.includes(item.type) ? item.item_title : ""
      }">`;
      if (item.type === "textarea") {
        input = `<textarea name="${alias}" class="quiz-item__input" placeholder="${item.item_title}"></textarea>`;
      }
      if (item.type === "img") {
        return img;
      }
      return `<label class="quiz-item ${
        isCheck ? "custom-checkbox" : ""
      } quiz-item__label">${img}
    ${input}
    ${
      isCheck
        ? '<span  class="custom-checkbox__content">' +
          item.item_title +
          "</span>"
        : ""
    }
    </label>`;
    });

    return `    <div class="quiz__content">
        <div class="quiz-element element-${step}">
          <h3 class="quiz-element__title">${title}</h3>
          <div class="quiz-element__items items">
            ${itemsHtml.join("")}
          </div>
          <div class="quiz__footer">
            <div class="quiz__steps">${step} из ${this.stepCount}</div>
            <button class="next-step btn quiz__btn" type="button" data-${
              isLastItem ? "send" : "next"
            }>${btnText}</button>
          </div>
        </div>
    </div>`;
  }
}

window.quiz = new Quiz("#quiz", quizData, {
  nextText: "Далее",
  submitText: "Получить",
});
