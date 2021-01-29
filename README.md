# validationApi
Validation Api for Flutterwave Interview
Api performs validation for data set and returns the validation result.

Installation Steps
1)Clone repo
2)run "npm install"
3)run "npm run dev" or "npm run start"

Sample request body 
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
}

Required Fields: "rule"(including all subfields) and "data".
Accepted rule conditions: 'gt','gte','contains','eq' and 'neq'.
For more info visit https://flwat.glitch.me/fulltime.html

