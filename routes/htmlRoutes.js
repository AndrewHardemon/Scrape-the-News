module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render('index');
  });

  app.get("/home", function(req, res) {
    res.render("home");
  });

  // app.get("/projects", function(req, res) {
  //   res.render("projects");
  // });
  
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};