import Messages from "../../models/clients/Messages.js";
import Providers from "../../models/providers/Providers.js";
import Users from "../../models/clients/Users.js";

export const createMessage = async (req, res, next) => {
  
  const { clientid, providerid } = req.body;

  // Concatenate clientid and providerid to create a unique ID
  const uniqueid = `${clientid}${providerid}`;

  
  const newMessage = new Messages({
    ...req.body,
    uniqueid:uniqueid, 
  });

  try {
    // Save the new message to the database
    const savedMessage = await newMessage.save();
    // Respond with the saved message
    res.status(200).json(savedMessage);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};



export const GetMessages = async(req, res,next)=>{
  try {

    const allmessages = await Messages.findById(req.params.id)
    res.status(200).json(allmessages)

  } catch (err) {
    next(err)
    
  }
}
