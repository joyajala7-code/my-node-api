export const getHome = (req, res) => {
     res.send(`<h1>Welcome to my Backend API!</h1>`)
}

export const getAbout = (req, res) => {
     res.send(`<h1>My name is Ajala Damilola. I am a backend developer learning Node.js</h1>`)
}

export const getGoals = (req, res) => {
     res.send(`<h1>My goal is to master Express and APIs.</h1>`)
}