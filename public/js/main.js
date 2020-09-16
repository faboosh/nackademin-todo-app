import {LoginForm} from './components/loginForm.js';
import {HomePage} from './components/homePage.js';

const components = {
    LoginForm,
    HomePage
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app');

    const startpage = [
        new LoginForm(root),
        
    ]

    startpage.forEach(component => {
        component.render();
    });

    //Router
    document.body.addEventListener('redirect', e => {
        const component = e.detail;
        console.log(component);
        if(components[component]) {
            while (root.firstChild) {
                root.removeChild(root.lastChild);
            }
            new components[component](root).render();
        }
    })
})