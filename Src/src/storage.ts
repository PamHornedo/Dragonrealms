import { createCard } from "./app";
import { Dragon } from "./models/Dragon";

const nameInput = document.getElementById('nameInput') as HTMLInputElement;
const typeInput = document.getElementById('typeInput') as HTMLInputElement;
const ageInput = document.getElementById('ageInput') as HTMLInputElement;
const elementInput = document.getElementById('elementInput') as HTMLInputElement;
const abilityInput = document.getElementById('abilityInput') as HTMLInputElement;
const characterForm = document.getElementById('char-form') as HTMLFormElement;
const list = document.getElementById('dragons') as HTMLDivElement;

interface FormInputs {
    Name: string;
    Type: string;
    Age: number;
    Element: string;
    SpecialAbility: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const savedDataString = localStorage.getItem('savedFormData');

    if (savedDataString) {
        try {
            const savedFormData: FormInputs = JSON.parse(savedDataString);
            const character = new Dragon(savedFormData.Name, savedFormData.Type, savedFormData.Age, savedFormData.Element, savedFormData.SpecialAbility)

            nameInput.value = savedFormData.Name || '';
            typeInput.value = savedFormData.Type || '';
            ageInput.value = `${savedFormData.Age}` || `${0}`;
            elementInput.value = savedFormData.Element || '';
            abilityInput.value = savedFormData.SpecialAbility || '';

            const card = createCard(character);
            list.prepend(card);
            console.log(card);

            console.log('form data loaded from local storage!');
        } catch (error) {
            console.error('error parsing saved data', error);
        }
    }
})

characterForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const formInputs: FormInputs = {
        Name: nameInput.value,
        Type: typeInput.value,
        Age: parseInt(ageInput.value),
        Element: elementInput.value,
        SpecialAbility: abilityInput.value,
    };

    try {
        localStorage.setItem('savedFormData', JSON.stringify(formInputs));
        console.log('form data saved to local storage');        
    } catch (error) {
        console.error('error saving to local storage', error);
    }
})