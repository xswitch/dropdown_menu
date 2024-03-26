import "./style.css";

const dropdownParent = document.querySelector("#content");

class Dropdown {
  container = document.createElement("div");

  contentContainer = document.createElement("div");

  titleContainer = document.createElement("div");

  choicesContainer = document.createElement("div");

  constructor(options) {
    this.container.appendChild(this.contentContainer);
    this.contentContainer.appendChild(this.titleContainer);
    this.contentContainer.appendChild(this.choicesContainer);
    this.container.classList.add("ddPlacement");
    this.contentContainer.classList.add("ddContainer");
    this.titleContainer.classList.add("ddTitleContainer");
    this.titleContainer.classList.add("ddItem");
    this.choicesContainer.classList.add("ddChoices");
    this.offset = 0;
    this.gap = 1;
    // LOOPS OVER ALL OPTIONS
    Object.entries(options).forEach(([optionName, optionValue]) => {
      // SETS PARENT
      if (optionName === "parent") {
        if (typeof optionValue === "string") {
          this.parent = document.querySelector(optionValue);
        } else {
          this.parent = optionValue;
        }
        this.parent.appendChild(this.container);
      }

      // SETS TITLE
      if (optionName === "title") {
        this.titleText = optionValue;
        this.title = document.createElement("div");
        this.title.textContent = `${optionValue}`;
        this.title.classList.add("ddTitle");
        this.titleContainer.appendChild(this.title);
        this.arrow = document.createElement("div");
        this.arrow.textContent = "▾";
        this.titleContainer.appendChild(this.arrow);
      }

      // SETS CHOICES
      if (optionName === "choices") {
        this.choices = [];
        optionValue.forEach((choice) => {
          const element = document.createElement("div");
          element.textContent = choice;
          element.value = choice;
          element.classList.add("ddItem");
          element.classList.add("ddChoice");
          element.style.height = "100%";
          element.style.cursor = "pointer";
          element.style.boxSizing = "border-box";
          element.addEventListener("click", () => this.updateTitle(choice));
          this.choices.push(element);
          this.choicesContainer.appendChild(element);
        });
      }

      // SETS USE
      if (optionName === "use") {
        if (optionValue === "click") this.setupClick();
        if (optionValue === "hover") this.setupHover();
      }

      if (optionName === "offset") this.offset = optionValue;
      if (optionName === "gap") this.gap = optionValue;
    });
    this.setupStyles();
    this.setupPosition(); // Sets position of content container based on offset and where title container is
  }

  setupStyles() {
    this.choicesContainer.style.overflow = "hidden"; // need to set it after getting the height
    this.choicesContainer.style.display = "grid";
    this.choicesContainer.style.gap = `${this.gap}px`;
    this.contentContainer.style.overflow = "hidden";
    this.contentContainer.style.display = "flex";
    this.contentContainer.style.flexDirection = "column";
    this.contentContainer.style.position = "fixed";
    this.contentContainer.style.transition = "all 0.2s";
    this.contentContainer.style.gap = `${this.offset}px`;
    this.titleContainer.style.display = "grid";
    this.titleContainer.style.gridTemplateColumns = "1fr auto";
    this.titleContainer.style.cursor = "pointer";
    this.titleContainer.style.boxSizing = "border-box";
  }

  setupPosition() {
    this.height =
      this.gap * this.choices.length +
      this.choicesContainer.offsetHeight +
      this.titleContainer.offsetHeight + // Gets the height of one element and multiplies it by amount of choices plus title
      this.offset; // Add the offset when expanded // Was always like one pixel off
    this.x = this.container.getBoundingClientRect().x;
    this.y = this.container.getBoundingClientRect().y;
    this.itemHeight = this.titleContainer.getBoundingClientRect().height;

    this.contentContainer.style.maxHeight = `${this.itemHeight}px`;
    this.contentContainer.style.top = `${this.y}px`;
  }

  setupClick() {
    this.active = true;
    this.container.addEventListener("click", () => {
      if (this.active) {
        this.expand();
        this.active = false;
      } else {
        this.collapse();
        this.active = true;
      }
    });
  }

  setupHover() {
    this.container.addEventListener("mouseover", () => {
      this.expand();
    });
    this.container.addEventListener("mouseleave", () => {
      this.collapse();
    });
  }

  updateTitle(text) {
    this.titleText = text;
    this.title.textContent = text;
    this.title.value = text;
    this.collapse();
  }

  expand() {
    this.contentContainer.style.maxHeight = `${this.height}px`;
    this.arrow.textContent = `▴`;
  }

  collapse() {
    this.contentContainer.style.maxHeight = `${this.itemHeight}px`;
    this.arrow.textContent = `▾`;
  }

  remove() {
    this.container.remove();
  }
}

const dd1 = new Dropdown({
  parent: dropdownParent,
  title: "All Projects",
  choices: ["Bryne", "Blåsenborg", "All Projects"],
  use: "hover",
  offset: 10,
  gap: 1,
});
