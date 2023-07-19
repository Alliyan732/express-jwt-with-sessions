const express = require('express');

const router = express.Router();

let employees = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all employees
router.get("/",(req,res)=>{

  // res.status(200).json(employees)

  res.send(JSON.stringify(employees,null,4));
});

// GET by specific ID request: Retrieve a single employee with email ID
router.get("/:email",(req,res)=>{
  // Update the code here
  const email = req.params.email;
  res.status(200).json(employees[email])
});


// POST request: Add a new employee
router.post("/",function (req,res){
  if (req.body.email){
      employees[req.body.email] = {
          "firstName":req.body.firstName,
          "lastName": req.body.lastName,
          "DOB": req.body.DOB
          }
  }
res.send("The employee" + (' ')+ (req.body.firstName) + " Has been added!");
});


// PUT request: Update the details of a employee with email id
router.put("/:email", function (req, res) {
  const email = req.params.email;
  let employee = employees[email]
  if (employee) { //Check is employee exists
      let DOB = req.body.DOB;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      

      //if DOB the DOB has been changed, update the DOB 
      if(DOB) {
          employee["DOB"] = DOB
      }
      if(firstName) {
          employee["firstName"] = firstName
      }
      if(lastName) {
          employee["lastName"] = lastName
      }

      employees[email]=employee;
      res.send(`employee with the email  ${email} updated.`);
  }
  else{
      res.send("Unable to find employee!");
  }
});


// DELETE request: Delete a employee by email id
router.delete("/:email", (req, res) => {
  const email = req.body.email
  delete employees[email];
  res.send("employee deleted!")
});

module.exports=router;
