import Cookies from "js-cookie"

const sources = [
    "/js/vendor/modernizr-3.5.0.min.js",
    "/js/vendor/jquery-3.2.1.min.js",
    "/js/popper.min.js",
    "/js/bootstrap.min.js",
    "/js/plugins.js",
    "/js/active.js"
]

const loadScript = () => {
    if(document.getElementById("lightbox"))
        document.getElementById("lightbox").remove()
    const externalScripts = document.getElementById('external-scripts')
    externalScripts.innerHTML = ''
    Promise.all(sources.map(src => {
        return new Promise((resolve, reject) => {
            try {
                let script = document.createElement('script')
                script.src = src
                script.async = false
                script.defer = true
                externalScripts.appendChild(script)
                resolve()
            }
            catch(err) { reject(err) }
        })  
    }))
}

const authCheck = async (callback) => {
    const token = await Cookies.get("session")
    if(token) {
        console.log(token)
        const response = await fetch("http://localhost:4000/auth/check", { 
            headers: {
                Authorization: 'bearer ' + token 
            }, 
            method : 'GET' 
        })
        if(response.status == 200) {
            const result = await response.json()
            localStorage.setItem("session", JSON.stringify(result))
        }
    }
    if(callback)
        callback()
}

export {loadScript, authCheck}

//#e59285