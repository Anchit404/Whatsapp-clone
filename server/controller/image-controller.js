import mongoose from 'mongoose';

const url = "http://localhost:8000"

let gridFsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
})

export const uploadFile = async (request, response ) => {
  if(!request.file){
    return  response.status(404).json('file not found')
  }
  const imageUrl = `${url}/file/${request.file.filename}`;

  return response.status(200).json(imageUrl);
}

export const getImage = async (request, response) => {
  try {
    const files = await gridFsBucket.find({filename: request.params.filename}).toArray();
    if (!files || files.length === 0) {
      return response.status(404).json('File not found');
    }
    
    const file = files[0];
    const readstream = gridFsBucket.openDownloadStream(file._id);
    readstream.pipe(response);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
}
