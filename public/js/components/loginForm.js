export class LoginForm {
    constructor(mountpoint) {
        this.mountpoint = mountpoint;
        this.root =  document.createElement('LoginForm');
        this.childComponents = {
            
        }
    }

    render() {
        const form = document.createElement('form');
        const username = document.createElement('input');
        const usernameLabel = document.createElement('p');
        const password = document.createElement('input');
        const passwordLabel = document.createElement('p');
        const loginBtn = document.createElement('button');

        usernameLabel.innerText = "Username"
        passwordLabel.innerText = "Password"
        loginBtn.innerText = "Login"

        form.append(usernameLabel, username, passwordLabel, password, loginBtn);

        this.root.append(form);
        
        form.addEventListener('submit', e => {
            e.preventDefault();
            const credentials = {
                username: username.value,
                password: password.value
            }
            
            this.login(credentials);
        })

        this.mountpoint.append(this.root);
    }

    login(credentials) {
        fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json())
            .then(res => {
                const { token } = res;
                if(!token) {
                    //set error message
                    alert('Login failed')
                } else {
                    //set success message and redirect
                    localStorage.setItem('token', token);
                    const event = new CustomEvent('redirect', {detail: 'HomePage'});
                    document.body.dispatchEvent(event);
                }
            })
            .catch(err => {
                alert('Login failed')
            })
    }
}