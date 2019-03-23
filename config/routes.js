var scrape = require("../scripts/scrape");
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");
var fetchController = require("../controllers/fetch");

module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render("home")
    });
    router.get("/saved", function (req, res) {
        res.render("saved");
    })

    router.get("/api/fetch", function(req, res) {
        request('https://www.ksl.com/')
            .then((res) => {
                const $ = cheerio.load(res.data);
                const articles = [];

                $("div.queue_story").each(function (i, element) {
                    let title = $(this).find("div").find("h2").text();
                    //    console.log(title)
                    let summary = $(this).find("div").find("h5").text();
                    //    console.log(summary)
                    let url = $(this).find("div").find("h2").find("a").attr("href");
                    //    console.log(url);

                    articles.push({ title, summary, url });
                });
                console.log(articles);
            });
            
    })


router.get("/api/fetch", function (req, res) {
    headlinesController.fetch(function (err, docs) {
        if (!docs || docs.insertedCount === 0) {
            res.json({
                message: "No new articles today. Check back tomorrow!"
            });
        }
        else {
            res.json({
                message: "Added " + docs.insertedCount + " new articles!"
            });
        }
    });
});

router.get("/api/headlines", function (req, res) {
    var query = {};
    if (req.query.saved) {
        query = req.query
    }
    headlinesController.get(query, function (data) {
        res.json(data);
    });
});

router.delete("/api/headlines/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function (err, data) {
        res.json(data);
    });
});

router.patch("/api/headlines", function (req, res) {
    headlinesController.update(req.body, function (err, data) {
        res.json(data);
    });
});

router.get("/api/notes/:headline_id?", function (req, res) {
    var query = {};
    if (req.params.headine_id) {
        query._id = req.params.headline_id;
    }
    notesController.get(query, function (err, data) {
        res.json(data)
    });
});

router.delete("/api/notes/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function (err, data) {
        res.json(data)
    });
});

router.post("/api/notes", function (req, res) {
    notesController.save(req.body, function (data) {
        res.json(data);
    });
});
    

};