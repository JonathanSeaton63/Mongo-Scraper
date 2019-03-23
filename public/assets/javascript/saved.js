$(document).ready(function () {
    var articleContainer = $(".article-container");
    $(document).on("click", "btn.delete", handleArticleDelete);
    $(document).on("click", "btn.notes", handleArticleNotes);
    $(document).on("click", "btn.save", handleNoteSave);
    $(document).on("click", "btn.note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=true").then(function (data) {
            if (data && data.length) {
                renderArticles(data)
            } else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                artile.headline,
                "<a class='btn-danger delete'>",
                "Delete From Saved",
                "</a>",
                "<a class='btn bn-info notes'>Article Notes</a>",
                "</h3>",
                "<div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join(""))

            panal.data("_id", article._id);

    return panel;
    }

    function renderEmpty() {
        var emptyAlert = 
        $(["<div class='alert alert-warning text-center'>",
        "<h4>Uh oh. Looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>Would You to Browse Available Articles?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/'></a>Browse Articles</a></h4>",
        "</div>",
        "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
    }

    function renderNotesList(data) {
        var notesToRender = [];
        var currentNote; 
        if (!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "No notes for this article yet.",
                "</li>"
            ].join("");
            notesToRender.push(currentNote)
        } 
        else { 
            for (var i = 0; i < data.notes.length; i++) {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-danger note-delete'>x</button",
                    "</li>"
                ].join(""));
                currentNote.children("button").data("_id", data.notes[i]._id);
                notesToRender.push(currentNote)
            }
        };
        $(".note-container").append(notesToRender);
    }

    // function handleArticleDelete() {
    //     var articleToDelete 
    // }
});