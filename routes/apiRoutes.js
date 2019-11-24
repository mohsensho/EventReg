/* eslint-disable prettier/prettier */
<<<<<<< HEAD
import { join } from 'path';
import { User, Event, Shift } from "../models";
import { authorize, isValidPassword, hashPassword } from "../auth";
=======
const db = require("../models");
const sec = require("../auth");
>>>>>>> e3736af95a2a1f47240a035dc83f5c83548a0604
// SMS config
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);
<<<<<<< HEAD
// End SMS config
export default app => {
  app.get("/api/users", (req, res) => {
    const user = authorize.verifyToken(req.cookies);
    return user ? res.json(user) : res.status(401).end();
  });
=======
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const nodemailer = require('nodemailer');
const nodemailerNTLMAuth = require('nodemailer-ntlm-auth');

// End SMS config
module.exports = app => {
>>>>>>> e3736af95a2a1f47240a035dc83f5c83548a0604

  app.post("/api/login", (req, res) => {
    User.findOne({ where: { email: req.body.email.trim() } }).then(user => {
      if (user) {
        user.authenticate(req.body.password.trim()).then(isCorrectPassword => {
          if (isCorrectPassword) {
            const { id, email, isStaff } = user;
<<<<<<< HEAD
            const token = authorize.generateToken(email, isStaff, id);
=======
            const token = sec.authorize.generateToken(id, email, isStaff);
>>>>>>> e3736af95a2a1f47240a035dc83f5c83548a0604
            res
              .cookie("authToken", token, {
                maxAge: 3600000,
                httpOnly: true,
                sameSite: true
              })
              .send("Success");
          } else {
            res.status(401).send("Invalid User Name or Password");
          }
        });
      } else {
        res.status(401).send("Invalid User Name or Password");
      }
    });
  });
  app.get("/register", function(req, res) {
    res.sendFile(join(__dirname + "/../public/register.html"));
  });
  app.post("/api/register", (req, res) => {
    if (isValidPassword(req.body.userPassword)) {
      hashPassword(req.body.userPassword.trim(), (err, hash) => {
        if (err) {
          res.status(500).end();
        }
        const newUserRequest = {
          firstName: req.body.userFirstName.trim(),
          lastName: req.body.userLastName.trim(),
          nickName: req.body.userNickName.trim(),
          phone: req.body.userPhone.replace(/[^0-9]/, "").trim(),
          email: req.body.userEmail.trim(),
          skills: req.body.userSkills.trim(),
          password: hash
        };
        User.create(newUserRequest)
          .then(user => {
            const token = authorize.generateToken(
              user.id,
              user.email,
              user.isStaff
            );
            res
              .cookie("authToken", token, {
                maxAge: 3600000,
                httpOnly: true,
                sameSite: true
              })
              .cookie("userName", user.nickName || user.firstName, {
                maxAge: 3600000
              })
              .send("Success");
            // Send SMS
            client.messages
              .create({
                body: "Thanks for the registration. We will Contact you soon. Murderboat.",
                from: "9712564994",
                to: newUserRequest.phone
              })
              .then(message => console.log(message.sid));
          })
          .catch(error => {
            console.log(`error from line 66 apiRoutes: ${error}`);
            res.status(400).end();
          });
      });
    } else {
      res.status(400).end();
    }
    // Send SMS
    client.messages
    .create({
      body: "Thanks for the registration. Please reply y to verify your number. Murderboat.",
      from: "9712564994",
      to: newUserRequest.phone
    })
    .then(message => console.log(message.sid));

  });
  // Recieving SMS
  // POST - Receive SMS Message
  app.post("/receiveSMS", (req, res) => {
    const attributes = req.body;
    console.log(attributes);
    if(attributes === "y" || attributes === "Y")
    {
      console.log("Phone number verified!");
    }
    res.status(201).json({ attributes });
  });
<<<<<<< HEAD
  // Example route that gets all Events
  app.post("/api/events", (req, res) => {
    Event.findAll({}).then(results => {
      let tbodyCreator = "";
      results.forEach(rows => {
        tbodyCreator += `
        <tr>
          <td>${rows.name}</td>
          <td>${rows.startTime.toString().substring(0, 16)}</td>
          <td>${rows.endTime.toString().substring(0, 16)}</td>
          <td class="right-align">
          <a href="/shifts.html?id=${rows.id}" class="waves-effect waves-light btn">Select</a>
          </td>                 
        </tr>`;
      });
      res.json(tbodyCreator);
    });
  });
  // Example route that gets all Shifts
  app.get("/api/shifts/:id", (req, res) => {
    Shift.findAll({
      where: {
        EventId: req.params.id
      }
    }).then(ShiftResults => {
      let tbodyShifts = "";
      ShiftResults.forEach(rowsShift => {
        tbodyShifts += `
        <tr>
          <td>${rowsShift.position}</td>
          <td>${rowsShift.startTime.toString().substring(0, 25)}</td>
          <td>${rowsShift.endTime.toString().substring(0, 25)}</td>
          <td class="right-align">
          <button class="shiftSignUp waves-effect waves-light btn" onclick="signupshift('${req.params.id}','${rowsShift.id}')">Join!</button>
          </td>                 
        </tr>`;
=======
  //send feedback SMS
  app.post("/sms", (req, res) => {
    /*const twiml = new MessagingResponse();
    console.log(req);
    let userPhone =req.body.from.toString().trim();
    let userText =req.body.text.toString().trim();
    //userPhone = "+19713363132";
    if(userPhone.length>9){
      let cutRange = parseInt(userPhone.length - 9)-1;
      userPhone = userPhone.slice(cutRange, 15);
    }
    if(userText === "Y" || userText === "y")
    {
      // update database
      const updateParams = {verifiedNumber: 1};
      db.User.update(updateParams, { where: { phone: userPhone } }).then(
        results => {
          res.json(results);
        }
      );
      twiml.message("Your number verified!");
      res.writeHead(200, {"Content-Type": "text/xml"});
      res.end(twiml.toString());
    }*/
  });
  app.put("/api/shift/:id", (req, res) => {
    const user = sec.authorize.verifyToken(req.cookies);
    if (user) {
      userEmail = user.email;
      db.User_Shift.update({
        UserId: user.id
      },
      {
        where: {
          id: req.params.id
        }
      }).then(response => {
        /*var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "murderboatpro@gmail.com",
            pass: "Az123123**"
          }
        });*/
        let transporter = nodemailer.createTransport({
          host: "server52.mylittledatacenter.com",
          port: 465,
          secure: false,
          auth: {
            type: "custom",
            method: "NTLM", // forces Nodemailer to use your custom handler
            user: "murderboat@acnu.us",
            pass: "AzAz123123**"
          },
          tls: {rejectUnauthorized: false},
          debug:true,
          customAuth: {
            NTLM: nodemailerNTLMAuth
          }
        });
        var mailOptions = {
          from: "murderboat@acnu.us",
          to: userEmail,
          subject: "Welcome to Murderboat!",
          text: "Thanks for Sign up in our event! We will contact you soon."
        };
        console.log("Sending confirmation email ...");
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.json(response);
>>>>>>> e3736af95a2a1f47240a035dc83f5c83548a0604
      });
    } else {
      res.status(401).end();
    }
  });
  app.put("/api/admin/:checktype", (req, res) => {
    const user = sec.authorize.verifyToken(req.cookies);
    if (user && user.isStaff) {
      const updateParams = {};
      updateParams[req.params.checktype] = true;
      db.User_Shift.update(updateParams, { where: { id: req.body.id } }).then(
        results => {
          res.json(results);
        }
      );
      
    } else {
      res.status(401).end();
    }
  });
};
