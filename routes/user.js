var express = require("express");
var router = express.Router();
var { user, contest } = require("../models");
var { isLoggedIn } = require("./middlewares");

router.use(isLoggedIn);
router.post("/createProject", async (req, res, next) => {
  const { name, start_date, end_date, host, field } = req.body;
  try {
    const new_proj = await Contest.create({
      contest_name: name,
      con_start_date: start_date,
      con_end_date: end_date,
      field,
      contest_host: host,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/contsetList", (req, res, next) => {
  res.render("user/contestList", {
    title: "contestList",
  });
});

router.get("/createContest", (req, res, next) => {
  res.render("user/createContest", {
    title: "createContest",
  });
});

router.post("/searchContest", async function (req, res, next) {
    let page = req.query.page;
    let offset = 0;
    const limit = 5;
  
    if (page > 1) {
      offset = limit * (page - 1);
    }
  
    let { start_date, end_date } = req.body;
    start_date = new Date(start_date);
    end_date = new Date(end_date);
    if (end_date < start_date) {
      return res.send(
        `<script type="text/javascript">window.location="/manager/manageAllProject";alert('올바르지 않은 입력입니다.');</script>`
      );
    } else {
      const conList = await Contest.findAll({
        where: {
          con_start_date: { [Op.gte]: start_date },
          con_end_date: { [Op.lte]: end_date },
        },
      });
      return res.render("user/searchContest", {
        title: "searchContest",
        result: conList,
      });
    }
  });

router.get("/updateContest", async (req, res, next) => {
  try {
    const currentCon = await Contest.findOne({ where: { id: req.params.id } });
    res.render("user/updateContest", {
      title: "updateContest",
      currentCon,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/updateContest", async (req, res, next) => {
  const {
    contest_name,
    con_start_date,
    con_end_date,
    field,
    contest_host,
  } = req.body;

  await Project.update(
    {
        contest_name,
        con_start_date,
        con_end_date,
        field,
        contest_host,
    },
    { where: { id: req.params.id } }
  );
  res.redirect(`user/updateContest/${req.params.id}`);
});

module.exports = router;
