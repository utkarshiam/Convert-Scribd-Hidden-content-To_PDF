const express = require("express");
const app = express();

const ejs = require("ejs");
const htmlPdf = require("html-pdf");

const fs = require("fs");
const path = require("path");

const images = [
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/85/oyo-corporate-presentation-1-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-2-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-3-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-4-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-5-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-6-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-7-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-8-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-9-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-10-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-11-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-12-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-13-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-14-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-15-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-16-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-17-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-18-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-19-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-20-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-21-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-22-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-23-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-24-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-25-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-26-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-27-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-28-638.jpg?cb=1462985173",
  "https://image.slidesharecdn.com/e65994d4-7336-4c77-9286-830e96cde2df-160511164547/95/oyo-corporate-presentation-29-638.jpg?cb=1462985173",
];

app.get("/", (req, res) => {
  fs.readFile(
    path.resolve(`${__dirname}/views/template.ejs`),
    "utf-8",
    (error, content) => {
      if (error) {
        console.log(error);
      } else {
        const html = ejs.render(content, {
          images,
        });
        var options = { orientation: "landscape" };

        htmlPdf.create(html, options).toStream(function (err, stream) {
          stream.pipe(res);
        });
      }
    }
  );
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
