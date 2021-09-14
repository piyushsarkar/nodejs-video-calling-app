

exports.root = (req, res) => {
  res.render('home');
};

exports.dashboard = (req, res) => {
  res.render('dashboard', {
    name: req.user.name
  });
};
