module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render('index');
  });

  // app.get("/about-me", function(req, res) {
  //   res.render("about");
  // });

  // app.get("/projects", function(req, res) {
  //   res.render("projects");
  // });
  
  app.get("*", function(req, res) {
    res.render("404");
  });
};