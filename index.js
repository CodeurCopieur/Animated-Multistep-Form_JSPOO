class multiForm {

  #lesForm
  #formStep
  currentStep
  #inputs
  allValid

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
    let incrementor

    if (target.matches('[data-next]')) {
      incrementor = 1
    } else if(target.matches('[data-previous]')) {
      incrementor = -1
    } 

    if (incrementor === null) return

    this.#inputs = [...this.#formStep[this.currentStep].querySelectorAll('input')]
    this.allValid = this.#inputs.every( input => input.reportValidity())

    if (this.allValid) {
      this.currentStep += incrementor
      this.#showCurrentStep()
    }
    
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