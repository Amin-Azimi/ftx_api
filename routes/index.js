var express = require("express");
var db = require("../datasources/database");
var dayjs = require("dayjs");
var router = express.Router();
var playUrl = require("../datasources/LiveMatch");

const fixture_router = require("./fixtures");
const randomMatchId = () => Math.floor(Math.random() * (2786 - 1 + 1)) + 1;

/* GET home page. */
router.use("/fixture", fixture_router);
router.get("/live/:id", function (req, res, next) {
  console.log("Id is:", req.params.id);
  if (req.params.id == 1) {
    let lv_url = "http://iptv.tivifa.com:8000/aminazimi/aminpass@123/99101";
    const matchList = [];
    let mIds = [];
    for (let i = 0; i < 10; i++) {
      mIds.push(randomMatchId());
    }
    const sqlMatches =
      `Select  hteam.team_name as hometeamname,awteam.team_name as awayteamname,hteam.img as homelogo,
    awteam.img as awaylogo,ft_match_time.match_datetime,ft_matchs.match_id,ft_league.league_name
    from ft_matchs 
    INNER JOIN ft_match_time on ft_matchs.match_id = ft_match_time.match_id
    INNER JOIN ft_teams as hteam on ft_matchs.team_home_id = hteam.team_id
    INNER JOIN ft_teams as awteam on ft_matchs.team_away_id = awteam.team_id
    INNER JOIN ft_league on ft_league.league_id = ft_matchs.league_id
    where ft_matchs.match_id in(` +
      mIds.join() +
      `) order by ft_match_time.match_datetime `;
    db.query(sqlMatches, (err, data) => {
      if (err) {
        console.log(`Error on connection: ${err.message}`)
      }
      else {
        data.forEach((row) => {
          let match = {
            hometeam: row.hometeamname,
            awayteam: row.awayteamname,
            homelogo: row.homelogo,
            awaylogo: row.awaylogo,
            matchtime: dayjs(row.match_datetime).format("HH:mm"),
            matchDate: dayjs(row.match_datetime).format("dddd,DD/MM/YYYY"),
            league: row.league_name,
            id: row.match_id,
          };
          matchList.push(match);
        });
        console.log("list", matchList.length);
        res.render("index", {
          title: "Live SportHD.com Broadcast",
          source: lv_url,
          mlist: matchList,
        });
      }
    });

    // var sql="SELECT cmt.isshowtime,ft_tv_coverage.live_url FROM (SELECT  match_id,IF((UTC_TIMESTAMP()> DATE_ADD(match_datetime,INTERVAL -130 MINUTE) and (UTC_TIMESTAMP() >= match_datetime)) ,'True','False') as isShowTime FROM ft_match_time WHERE match_id="+req.params.id+") cmt  inner join ft_tv_coverage on ft_tv_coverage.match_id = cmt.match_id;";
    // console.log(sql);
    // var isMatchTime = false;
    // db.query(sql, function (err, data) {
    //   if(err) throw err;
    //   data.forEach( (row) => {
    //     isMatchTime = (row.isShowTime.toLowerCase() == 'true');
    //     console.log("isShowTime "+req.params.id +"  "+isMatchTime);
    //   });
    //   // if(data.length > 0){
    //   //   isMatchTime = (data[0].isShowTime.toLowerCase() == 'true');
    //   //   console.log("isShowTime "+req.params.id +"  "+isMatchTime)
    //   // }
    //   // else
    //   //   console.log("isShowTime "+req.params.id +" NOTHING ")
    //   if(isMatchTime == true)
    //   {
    //     lv_url = data[0].live_url;
    //   }
    //   console.log("url is:",lv_url);
    //   res.render('index', { title: 'Live SportHD.com Broadcast',source:lv_url });
    //   // res.render('plyr', { title: 'plyr Broadcast',source:lv_url });
    // if (err) throw err;
    // });
  }
});

router.get("/play/:id", function (req, res, next) {
  let live_url = "http://iptv.tivifa.com:8000/aminazimi/aminpass@123/99101";
  const sqlUrl = `SELECT live_url FROM ft_tv_coverage   WHERE match_id=${req.params.id}`;
  db.query(sqlUrl, (err, data) => {
    if (err) throw err;
    else {
      live_url = data[0].live_url;
      console.log("the url is:", live_url);
      res.render("plyr", { title: "Live Match", source: live_url });
        }
  });
});
router.get("/play1/:id", function (req, res, next) {
  let live_url = "http://iptv.tivifa.com:8000/aminazimi/aminpass@123/99101";
  const sqlUrl = `SELECT live_url FROM ft_tv_coverage   WHERE match_id=${req.params.id}`;
  db.query(sqlUrl, (err, data) => {
    if (err) throw err;
    else {
      live_url = data[0].live_url;
      console.log("the url is:", live_url);
      res.render("plyr1", { title: "Live Match", source: live_url });
        }
  });
});
router.get("/play2/:id", function (req, res, next) {
  let live_url = "http://iptv.tivifa.com:8000/aminazimi/aminpass@123/99101";
  const sqlUrl = `SELECT live_url FROM ft_tv_coverage   WHERE match_id=${req.params.id}`;
  db.query(sqlUrl, (err, data) => {
    if (err) throw err;
    else {
      live_url = data[0].live_url;
      console.log("the url is:", live_url);
      res.render("plyr2", { title: "Live Match", source: live_url });
        }
  });
});

router.get("/play3/:id", function (req, res, next) {
  let live_url = "http://iptv.tivifa.com:8000/aminazimi/aminpass@123/99101";
  const sqlUrl = `SELECT live_url FROM ft_tv_coverage   WHERE match_id=${req.params.id}`;
  db.query(sqlUrl, (err, data) => {
    if (err) throw err;
    else {
      live_url = data[0].live_url;
      console.log("the url is 3:", live_url);
      res.render("plyr3", { title: "Live Match 3", source: live_url });
        }
  });
});
module.exports = router;
