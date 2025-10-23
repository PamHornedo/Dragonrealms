import { createCard } from "./app.js";
import { Dragon } from "./models/Dragon.js";

const list = document.getElementById('dragons') as HTMLDivElement;


document.addEventListener('DOMContentLoaded', () => {
    const savedDataString = localStorage.getItem('savedFormData');

    if (savedDataString) {
        try {
            const savedFormData: Dragon = JSON.parse(savedDataString);
            console.log(savedFormData);
            
            const card = createCard(savedFormData);
            list.prepend(card);
            console.log(card);

            console.log('form data loaded from local storage!');
        } catch (error) {
            console.error('error parsing saved data', error);
        }
    }
})

export function addLocalStorage(dragon: Dragon) {
    try {
        localStorage.setItem('savedFormData', JSON.stringify(dragon));
        console.log('form data saved to local storage');        
    } catch (error) {
        console.error('error saving to local storage', error);
    }
}