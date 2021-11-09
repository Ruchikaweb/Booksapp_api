const express = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
var mongourl="mongodb+srv://ruchikaa:ruchika123@websites.djtcx.mongodb.net/Secondhsndbook?retryWrites=true&w=majority"
var db;
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;


app.use(fileupload({
 useTempFiles:true
}))

 cloudinary.config({
 cloud_name:'dcdelrn5d',
api_key:'357859941968782',
api_secret:'AAq4oCL7rr3t-ADlvMbe70lrBMA'
}) ;



//health Check
app.get('/',(req,res) => {
    res.send("Health Ok");
});

//for upload image//
app.post('/uploadImage',(req,res)=>{
  const file = req.files.image
  cloudinary.uploader.upload(file.tempFilePath, (error, result)=> {
      if(error) throw error
      res.send(result)
  });

})

//get Books api for All books//
app.get('/all_books',(req,res) => {
  db.collection('Books').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//get Books api for availablebooks//
app.get('/available_books',(req,res) => {
  db.collection('Books').find({isActive:true}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//get Books api for out of stackbooks//
app.get('/out_of_stock_books',(req,res) => {
  db.collection('Books').find({isActive:false}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//post Bookss //
app.post('/post_books',(req,res)=>{
  db.collection('Books').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});

//out of stalk books//
app.put('/deactivatebooks/:id',(req,res) => {
  var id = mongo.ObjectID(req.params.id)
  db.collection('Books').updateOne(
      {_id:id},
      {
          $set:{ 
              isActive:false
          }
      },(err,result) => {
          if(err) throw err;
          res.status(200).send('Data Updated')
      }
  )
});

// in stalk books //
app.put('/activatebooks/:id',(req,res) => {
  var id = mongo.ObjectID(req.params.id)
  db.collection('Books').updateOne(
      {_id:id},
      {
          $set:{
              isActive:true
          }
      },(err,result) => {
          if(err) throw err;
          res.status(200).send('Data Updated')
      }
  )
}); 

// Hard delete books ///
app.delete('/deletebook/:id',(req,res) =>{
  var id = mongo.ObjectID(req.params.id)
  db.collection('Books').remove({_id:id}, (err,result) =>{
    if(err) throw err;
    res.status(200).send('deleted')
  })
}) ;

//get User request api//
app.get('/request',(req,res) => {
  db.collection('userrequest').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//post User request api//
app.post('/post_request',(req,res)=>{
  db.collection('userrequest').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});


//get Donate book request api//
app.get('/donate_book_request',(req,res) => {
  db.collection('Donatereq').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//post Donate book request api//
app.post('/post_donate_bk_request',(req,res)=>{
  db.collection('Donatereq').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});


//get Subscriber api for All books//
app.get('/all_subscriber',(req,res) => {
  db.collection('Subscribers').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//get Subscribers api for available Subscriber//
app.get('/available_subscriber',(req,res) => {
  db.collection('Subscribers').find({isActive:true}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})
//get Subscribers api for blocked Subscribers//
app.get('/out_of_stock_subscriber',(req,res) => {
  db.collection('Subscribers').find({isActive:false}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
}) 

//post Subscribers //
app.post('/post_subscriber',(req,res)=>{
  db.collection('Subscribers').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});

//soft delete Subscriber//
app.put('/deactivesubscriber/:id',(req,res) => {
  var id = mongo.ObjectID(req.params.id)
  db.collection('Subscribers').updateOne(
      {_id:id},
      {
          $set:{ 
              isActive:false
          }
      },(err,result) => {
          if(err) throw err;
          res.status(200).send('Data Updated')
      }
  )
});

//Reactive
app.put('/activatesubscriber/:id',(req,res) => {
  var id = mongo.ObjectID(req.params.id)
  db.collection('Subscribers').updateOne(
      {_id:id},
      {
          $set:{
              isActive:true
          }
      },(err,result) => {
          if(err) throw err;
          res.status(200).send('Data Updated')
      }
  )
}); 

//get Books_order//
app.get('/books_order',(req,res) => {
  db.collection('Bookorder').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//post  Book_order api//
app.post('/post_book_order',(req,res)=>{
  db.collection('Bookorder').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});


//get card_details//
app.get('/add_to_card',(req,res) => {
  db.collection('Carddetails').find({}).toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

//post card_details api//
app.post('/post_add_to_card',(req,res)=>{
  db.collection('Carddetails').insert(req.body,(err,result) => {
    if(err) throw err;
    res.send('data added');
  })
});

//post login///
app.post('/login',(req,res)=>{
  var mobileno = req.body.mobileno
  var pwd = req.body.password
  db.collection('Subscribers').find({mobileno:mobileno,password:pwd}).toArray((err,result) => {
    if(err) throw err;
    res.send(result);
  })
});

//forgetpwd api//
app.post('/forgetpwd',(req,res)=>{
  var email = req.body.email
  var question = req.body.question
  var answer = rew.body.answer
  db.collection('Subscribers').find({email:email,selectquestion:question,answer:answer}).toArray((err,result) => {
    if(err) throw err; 
    res.send(result);
  })
});

///pwd update////
app.put('/forgetpwdupdate',(req,res) => {
  var email = req.body.email
  var password = req.body.password
  var  conformpassword = req.body.conformpassword
  db.collection('Subscribers').updateOne(
      {email:email},
      {
          $set:{
              password:password,
              conformpassword:conformpassword
          }
      },(err,result) => {
          if(err) throw err;
          res.status(200).send('Data Updated')
      }
  )
}); 
 

//connection with mongo serer
MongoClient.connect(mongourl,{ useUnifiedTopology: true },(err,connection) => {
    if(err) console.log(err);
    db = connection.db('Secondhsndbook');
  
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Server is running on port ${port}`)
    })
  })


// const express = require('express');
// const app = express();
// const port = process.env.PORT || 9900;
// const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;
// const bodyParser = require('body-parser');
// const cors = require('cors');
// var mongourl="mongodb+srv://ruchikaa:ruchika123@websites.djtcx.mongodb.net/Secondhsndbook?retryWrites=true&w=majority"
// var db;

// const fileupload = require('express-fileupload');
// const cloudinary = require('cloudinary').v2;


// app.use(fileupload({
//   useTempFiles:true
//  }))

//  cloudinary.config({
//   cloud_name:'dcdelrn5d',
//   api_key:'357859941968782',
//   api_secret:'AAq4oCL7rr3t-ADlvMbe70lrBMA'
// }) ;



// //health Check
// app.get('/',(req,res) => {
//     res.send("Health Ok");
// });

// //for upload image//
// app.post('/uploadImage',(req,res)=>{
//   const file = req.files.image
//   cloudinary.uploader.upload(file.tempFilePath, (error, result)=> {
//       if(error) throw error
//       res.send(result)
//   });

// //get Books api for All books//
// app.get('/all_books',(req,res) => {
//   db.collection('Books').find({}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //get Books api for availablebooks//
// app.get('/available_books',(req,res) => {
//   db.collection('Books').find({isActive:true}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //get Books api for out of stackbooks//
// app.get('/out_of_stock_books',(req,res) => {
//   db.collection('Books').find({isActive:false}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //post Bookss //
// app.post('/post_books',(req,res)=>{
//   db.collection('Books').insert(req.body,(err,result) => {
//     if(err) throw err;
//     res.send('data added');
//   })
// });

// //out of stalk books//
// app.put('/deactivatebooks/:id',(req,res) => {
//   var id = mongo.ObjectID(req.params.id)
//   db.collection('Books').updateOne(
//       {_id:id},
//       {
//           $set:{ 
//               isActive:false
//           }
//       },(err,result) => {
//           if(err) throw err;
//           res.status(200).send('Data Updated')
//       }
//   )
// });

// // in stalk books //
// app.put('/activatebooks/:id',(req,res) => {
//   var id = mongo.ObjectID(req.params.id)
//   db.collection('Books').updateOne(
//       {_id:id},
//       {
//           $set:{
//               isActive:true
//           }
//       },(err,result) => {
//           if(err) throw err;
//           res.status(200).send('Data Updated')
//       }
//   )
// }); 

// // Hard delete books ///
// app.delete('/deletebook/:id',(req,res) =>{
//   var id = mongo.ObjectID(req.params.id)
//   db.collection('Books').remove({_id:id}, (err,result) =>{
//     if(err) throw err;
//     res.status(200).send('deleted')
//   })
// }) ;

// //get User request api//
// app.get('/request',(req,res) => {
//   db.collection('userrequest').find({}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //post User request api//
// app.post('/post_request',(req,res)=>{
//   db.collection('userrequest').insert(req.body,(err,result) => {
//     if(err) throw err;
//     res.send('data added');
//   })
// });


// //get Donate book request api//
// app.get('/donate_book_request',(req,res) => {
//   db.collection('Donatereq').find({}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //post Donate book request api//
// app.post('/post_donate_bk_request',(req,res)=>{
//   db.collection('Donatereq').insert(req.body,(err,result) => {
//     if(err) throw err;
//     res.send('data added');
//   })
// });


// //get Subscriber api for All books//
// app.get('/all_subscriber',(req,res) => {
//   db.collection('Subscribers').find({}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //get Subscribers api for available Subscriber//
// app.get('/available_subscriber',(req,res) => {
//   db.collection('Subscribers').find({isActive:true}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //get Subscribers api for blocked Subscribers//
// app.get('/out_of_stock_subscriber',(req,res) => {
//   db.collection('Subscribers').find({isActive:false}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// }) 

// //post Subscribers //
// app.post('/post_subscriber',(req,res)=>{
//   db.collection('Subscribers').insert(req.body,(err,result) => {
//     if(err) throw err;
//     res.send('data added');
//   })
// });

// //soft delete Subscriber//
// app.put('/deactivesubscriber/:id',(req,res) => {
//   var id = mongo.ObjectID(req.params.id)
//   db.collection('Subscribers').updateOne(
//       {_id:id},
//       {
//           $set:{ 
//               isActive:false
//           }
//       },(err,result) => {
//           if(err) throw err;
//           res.status(200).send('Data Updated')
//       }
//   )
// });

// //Reactive
// app.put('/activatesubscriber/:id',(req,res) => {
//   var id = mongo.ObjectID(req.params.id)
//   db.collection('Subscribers').updateOne(
//       {_id:id},
//       {
//           $set:{
//               isActive:true
//           }
//       },(err,result) => {
//           if(err) throw err;
//           res.status(200).send('Data Updated')
//       }
//   )
// }); 

// //get Books_order//
// app.get('/books_order',(req,res) => {
//   db.collection('Bookorder').find({}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //post  Book_order api//
// app.post('/post_book_order',(req,res)=>{
//   db.collection('Bookorder').insert(req.body,(err,result) => {
//     if(err) throw err;
//     res.send('data added');
//   })
// });


// //get card_details//
// app.get('/add_to_card',(req,res) => {
//   db.collection('Carddetails').find({}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// //post card_details api//
// app.post('/post_add_to_card',(req,res)=>{
//   db.collection('Carddetails').insert(req.body,(err,result) => {
//     if(err) throw err;
//     res.send('data added');
//   })
// });

// //post login///
// app.post('/login',(req,res)=>{
//   var mobileno = req.body.mobileno
//   var pwd = req.body.password
//   db.collection('Subscribers').find({mobileno:mobileno,password:pwd}).toArray((err,result) => {
//     if(err) throw err;
//     res.send(result);
//   })
// });

// //forgetpwd api//
// app.post('/forgetpwd',(req,res)=>{
//   var email = req.body.email
//   var question = req.body.question
//   var answer = rew.body.answer
//   db.collection('Subscribers').find({email:email,selectquestion:question,answer:answer}).toArray((err,result) => {
//     if(err) throw err; 
//     res.send(result);
//   })
// });

// ///pwd update////
// app.put('/forgetpwdupdate',(req,res) => {
//   var email = req.body.email
//   var password = req.body.password
//   var  conformpassword = req.body.conformpassword
//   db.collection('Subscribers').updateOne(
//       {email:email},
//       {
//           $set:{
//               password:password,
//               conformpassword:conformpassword
//           }
//       },(err,result) => {
//           if(err) throw err;
//           res.status(200).send('Data Updated')
//       }
//   )
// }); 
 

// //connection with mongo serer
// MongoClient.connect(mongourl,(err,connection) => {
//     if(err) console.log(err);
//     db = connection.db('Secondhsndbook');
  
//     app.listen(port,(err) => {
//       if(err) throw err;
//       console.log(`Server is running on port ${port}`)
//     })
//   })

  