class Stepper {
    constructor(htmlTarget, stepsContent, currentStep = 0) {
        this.htmlTarget = htmlTarget;
        this.stepsContent = stepsContent;
        this.currentStep = currentStep;
        this.render();
    }

    render() {
        const totalSteps = this.stepsContent.length;
        const progressPercentage = (100 / (totalSteps - 1)) * this.currentStep;
        let stepsHtml = '';
        for (let i = 0; i < totalSteps; i++) {
            const leftPosition = (i / (totalSteps - 1)) * 100;
            const isCurrent = i == this.currentStep;
            const isFinished = i < this.currentStep;

            const btnLabel = isFinished ? '<i class="fa-solid fa-check"></i>' : `<div class="text-center">${i + 1}</div>`
            const currentClass = isFinished ? 'btn-primary' : isCurrent ? 'btn-primary':'btn-secondary'
            const currentStyle = isFinished || isCurrent ? 'width:2.5rem;height:2.5rem; top:-1.25rem;':'width:1.8rem;height:1.8rem; top:-1rem;'

            stepsHtml += `
                <button type="button" class="${currentClass}  btn btn-sm  rounded-pill " 
                    style="position: absolute; left: ${leftPosition}%; transform: translateX(-50%);  ${currentStyle}">
                    ${btnLabel}
                </button>
                <div class="text-white" style="position: absolute; left: ${leftPosition}%; transform: translateX(-50%); top:2rem;">
                    ${this.stepsContent[i].title}
                </div>
            `;
        }

        $(this.htmlTarget).html(`
            <div class="position-relative m-4">
                <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100" style="height: 1px;">
                    <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                </div>
                ${stepsHtml}
            </div>
            <div style="margin-top:5rem">
                <div>
                    ${this.stepsContent[this.currentStep].content}
                </div>
            </div>
        `);
    }

    setStep(step) {
        this.currentStep = step;
        this.render();
    }

    nextStep() {
        const nextStep = this.currentStep + 1;
        if (nextStep < this.stepsContent.length) {
            this.setStep(nextStep);
        }
    }

    previousStep() {
        const previousStep = this.currentStep - 1;
        if (previousStep >= 0) {
            this.setStep(previousStep);
        }
    }
}
