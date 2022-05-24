const axios = require('axios').default;
const express = require('express');

const nodemailer = require("nodemailer");

const config = require('./config');

var pdf = require("pdf-creator-node");
var fs = require("fs");
var path = require("path");

var html = fs.readFileSync(path.join(__dirname, "./temp.html"), "utf8");

const app = express()
const port = 4000

const hbs = require('nodemailer-express-handlebars');

app.get('/', (req, res) => {
	if(req.headers.authorization){
		createAndSend(req.headers.authorization, (v) => {
			v.then((val) => {
				if(val.accepted.length > 0){
					res.send({ success: 'Done!' });
				}else {
					res.send({ error: 'There is no header!' });
				}
			})
		});
	}else{
		res.send({ error: 'There is no header!' });
	}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function createAndSend(token, callback){
  var options = {
    format: "A4",
    orientation: "portrait",
  };

  axios.get('http://192.168.0.31:3000/resumes/', {
    headers: {'Authorization': token}
  })
  .then(function (response) {
    let sections = response.data[0].sections;
    var document = {
      html: html,
      data: {
        sections,
      },
      path: "./output.pdf",
      type: "", // "stream" || "buffer" || "" ("" defaults to pdf)
    };
    
    pdf
      .create(document, options)
      .then( (res) => {
       return callback(sendMail(options.filename));
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  
}

async function sendMail(path) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: config.host,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.user, // generated ethereal user
      pass: config.pass, // generated ethereal password
    }
  });
  transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath:'./'
  }))
  //     html: 'Merhaba, <br/>Uygulamamız üzerinden <a href="https://www.google.com">Unity Developer ilanınıza</a> başvuru yapıldı. İlgili kişinin özgeçmişi ektedir, değerlendirilmesini rica ederiz.<br/>İyi çalışmalar.', // plain text body

  return await transporter.sendMail({
    from: '"Mail Otomasyon" <'+config.host+'>', // sender address
    to: "kaansariaydin@yandex.com", // list of receivers
    subject: "Unity Developer pozisyonu için başvuru", // Subject line
    attachments: [
      {
        filename:'cv.pdf',
        path:path
      }
    ],
    template: 'main'
  });
}