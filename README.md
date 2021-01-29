# validationApi
Validation Api for Flutterwave Interview <br>
Api performs validation for data set and returns the validation result. <br>

Installation Steps <br>
1)Clone repo <br>
2)run "npm install" <br>
3)run "npm run dev" or "npm run start" <br>

Sample request body  <br>
{
  "rule": {
    "field": "missions.count",
    "condition": "neq",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      "count": 30,
      "successful": 44,
      "failed": 1
    }
  }
} <br>

Required Fields: "rule"(including all subfields) and "data". <br>
Accepted rule conditions: 'gt','gte','contains','eq' and 'neq'. <br>
For more info visit https://flwat.glitch.me/fulltime.html

