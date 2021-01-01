import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { exists } from 'fs';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get ("/filteredimage", async (req, res) => {
    const url = req.query.image_url
    // Validate url exists
    if (typeof url !== 'undefined'){
      const image_path = await filterImageFromURL(url)
      res.sendFile(image_path, {}, (err) => {
        deleteLocalFiles([image_path])
      })
    } else {
      res.send("Test Works but no url")
    }
  })

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();