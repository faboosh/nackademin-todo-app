export class HomePage {
    constructor(mountpoint) {
        this.mountpoint = mountpoint;
        this.root =  document.createElement('HomePage');
    }

    render() {
        if(!localStorage.getItem('token')) {
            const event = new CustomEvent('redirect', {detail: 'LoginForm'});
            document.body.dispatchEvent(event);
        } else {
            const secret = document.createElement('p');

            secret.innerText = "u got in lol"
    
            this.root.append(secret);
        
            this.mountpoint.append(this.root);
        }
    }
}