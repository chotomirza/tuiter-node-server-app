import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime() + '';
    newTuit.likes = 0;
    newTuit.dislikes = 0;
    newTuit.liked = false;
    newTuit.disliked = false;
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
        (t) => t._id === tuitdIdToUpdate)
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates};
    res.sendStatus(200);
}


const deleteTuit = (req, res) => {
    const tuitIdToDelete = req.params['tid'];
    tuits = tuits.filter((twt) =>
        twt._id !== tuitIdToDelete);
    res.sendStatus(200);
}



export default (app) => {
    app.post('/api/tuits', createTuit);
    app.put('/api/tuits/:tid', updateTuit);
    app.get('/api/tuits', findTuits);
    app.delete('/api/tuits/:tid', deleteTuit);
}
