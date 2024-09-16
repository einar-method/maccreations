export class NavButtons {
    constructor() {
      this.buttons = [
        { name: "home", id: "homeBtn", isActive: true },
        { name: "portfolio", id: "portfolioBtn", isActive: false },
        { name: "merch", id: "merchBtn", isActive: false },
        { name: "blog", id: "blogBtn", isActive: false }
      ];
  
      this.defaultStyle = `
        color: var(--white-color);
        background-color: var(--primary-color);
        border: 0.1px solid var(--white-color);
        border-radius: 0px;
        padding: 5px 5px;
        display: inline-block;
        font-size: 18px;
        letter-spacing: 1px;
        cursor: pointer;
        box-shadow: inset 0 0 0 0 var(--white-color);
        -webkit-transition: ease-out 0.4s;
        -moz-transition: ease-out 0.4s;
        transition: ease-out 0.4s;
        flex-grow: 1;
      `;
  
      this.activeStyle = `
        color: var(--tirtary-color);
        background-color: var(--primary-color);
        border-left: 0.1px solid var(--white-color);
        border-right: 0.1px solid var(--white-color);
        border-top: 0.1px solid var(--white-color);
        border-bottom: 0.1px solid var(--white-color);
        border-radius: 0px;
        padding: 5px 5px;
        display: inline-block;
        font-size: 18px;
        letter-spacing: 1px;
        cursor: default;
        box-shadow: inset 0 0 0 25px var(--secondary-color);
        -webkit-transition: ease-out 0.4s;
        -moz-transition: ease-out 0.4s;
        transition: ease-out 0.4s;
        flex-grow: 1;
      `;
  
      this.hoverStyle = `
        color: var(--secondary-color);
        background-color: var(--primary-color);
        border: 0.1px solid var(--white-color);
        border-radius: 0px;
        padding: 5px 5px;
        display: inline-block;
        font-size: 18px;
        letter-spacing: 1px;
        cursor: pointer;
        box-shadow: inset 0 0 0 25px var(--white-color);
        -webkit-transition: ease-out 0.4s;
        -moz-transition: ease-out 0.4s;
        transition: ease-out 0.4s;
        flex-grow: 1;
      `
    }
  
    // Method to apply styles based on isActive
    applyStyles(button) {
      const buttonElement = document.getElementById(button.id);
      buttonElement.style = button.isActive ? this.activeStyle : this.defaultStyle;
  
      buttonElement.addEventListener('mouseover', () => {
        if (!button.isActive) {
          buttonElement.style = this.hoverStyle;
        }
      });
      buttonElement.addEventListener('mouseout', () => {
        buttonElement.style = button.isActive ? this.activeStyle : this.defaultStyle;
      });
    }
  
    // Apply styles to all buttons
    applyAllStyles() {
      document.styleSheets[0].insertRule("#homeBtn:hover { background-color: red; }", 1);
      this.buttons.forEach(button => this.applyStyles(button));
    }
};