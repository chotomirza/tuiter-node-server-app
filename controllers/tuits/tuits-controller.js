import posts from "./tuits.js";
// import dp_image from "./../../../tuiter-react-web-app/public/images/tesla.png"
let tuits = posts;

const createTuit = (req, res) => {
    const newTuit = req.body;

    newTuit._id = (new Date()).getTime() + '';
    newTuit.likes = 0;
    newTuit.dislikes = 0;
    newTuit.liked = false;
    newTuit.disliked = false;

    newTuit.topic = "default tuit topic";
    newTuit.username = "DefaultUser";
    newTuit.handle = "@defaultHandle";
    newTuit.image = "nasa_pic.jpg";
    newTuit.time = "1h";
    newTuit.title = "Default Title";
    // newTuit.tuit = "default tuit text";
    newTuit.replies = 0;
    newTuit.retuits = 0;

    // newTuit.image = "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Wendy%27s_full_logo_2012.svg/1200px-Wendy%27s_full_logo_2012.svg.png"; // is this working?
    tuits.push(newTuit);
    res.json(newTuit);
}

const findTuits  = (req, res) => {
    // const type = req.query.type
    // if(type) {
    //     const tuitsOfType = tuits
    //         .filter(t => t.type === type)
    //     res.json(tuitsOfType)
    //     return
    // }
    res.json(tuits);
}


const updateTuit = (req, res) => {
    // const tuitId = req.params['tid'];
    // const updates = req.body;
    // tuits = tuits.map((twt) =>
    //     twt._id === tuitId ?
    //         {...twt, ...updates} :
    //         twt
    // );
    // res.sendStatus(200);

    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex(
        (t) => t._id.toString() === tuitdIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}


const deleteTuit = (req, res) => {
    const tuitIdToDelete = req.params['tid'];
    tuits = tuits.filter((twt) =>
        twt._id.toString() !== tuitIdToDelete);
    res.sendStatus(200);
}



export default (app) => {
    app.post('/api/tuits', createTuit);
    app.put('/api/tuits/:tid', updateTuit);
    app.get('/api/tuits', findTuits);
    app.delete('/api/tuits/:tid', deleteTuit);
}
