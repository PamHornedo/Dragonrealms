import { createCard } from "./app.js";
import { Dragon } from "./models/Dragon.js";

const list = document.getElementById('dragons') as HTMLDivElement;
let storedData: Dragon[] = [];

document.addEventListener('DOMContentLoaded', () => {
    const savedDataString = localStorage.getItem('savedFormData');

    if (savedDataString) {
        try {
            const savedFormData: Dragon[] = JSON.parse(savedDataString);
            console.log(savedFormData);
            storedData.push(...savedFormData);
            
            savedFormData.forEach((dragon: Dragon) => {
                const card = createCard(dragon);
                list.prepend(card);
                console.log(card);
            });

            console.log('form data loaded from local storage!');
        } catch (error) {
            console.error('error parsing saved data', error);
        }
    }
})

export function addLocalStorage(dragon: Dragon) {
    storedData.push(dragon);
    
    try {
        localStorage.setItem('savedFormData', JSON.stringify(storedData));
        console.log('form data saved to local storage');        
    } catch (error) {
        console.error('error saving to local storage', error);
    }
}