class multiForm {

  #lesForm
  #formStep
  currentStep

  constructor(forms) {
    this.#lesForm = forms
    this.#formStep = [...forms.querySelectorAll('[data-step]')]

    this.#lesForm.addEventListener('click', e => this.#buttonClick(e))
  } 

  findElt() {
    this.currentStep = this.#formStep.findIndex(step => step.classList.contains('active'));

    if (this.currentStep < 0) {
      this.currentStep = 0
      this.#formStep[this.currentStep].classList.add('active')
    }

  }

  #buttonClick({target}) {
    console.log(target);

    if (target.matches('[data-next]')) {
      this.currentStep += 1
    } else if(target.matches('[data-previous]')) {
      this.currentStep -= 1
    } else {
      return
    }

    this.#showCurrentStep()
  }

  #showCurrentStep() {
    this.#formStep.forEach((step, i) => {
      step.classList.toggle('active', i === this.currentStep)
    })
  }
}


addEventListener('load', ()=> {
  /** @type {HTMLELEMENT} form */
  const form = document.querySelector('[data-multi-step]')

  new multiForm(form)
    .findElt()
})