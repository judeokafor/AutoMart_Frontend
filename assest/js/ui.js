/* eslint-disable class-methods-use-this */
class UI {
  // show alert message
  showAlert(message, className) {
    // clear any remaining alerts
    this.clearAlert();
    const div = document.createElement('div');
    // add classes
    div.className = className;
    // add text
    div.appendChild(document.createTextNode(message));
    // append it to the dom
    // get a parent
    const parent = document.querySelector('.parent');
    const inBetween = document.querySelector('.in-between');
    // insert alert
    parent.insertBefore(div, inBetween);
    // timeout after 3 secs
    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}
