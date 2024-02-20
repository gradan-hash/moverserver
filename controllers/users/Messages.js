import Messages from "../../models/clients/Messages.js";
import Providers from "../../models/providers/Providers.js";
import Users from "../../models/clients/Users.js";

export const createMessage = async (req, res, next) => {
  // console.log(req.body);

  const { clientid, providerid } = req.body;

  // Concatenate clientid and providerid to create a unique ID
  const uniqueid = `${clientid}${providerid}`;

  const newMessage = new Messages({
    ...req.body,
    uniqueid: uniqueid,
  });

  try {
    // Save the new message to the database
    const savedMessage = await newMessage.save();
    // console.log(savedMessage);
    // Respond with the saved message
    res.status(200).json(savedMessage);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

export const updateReplyMessage = async (req, res, next) => {
  console.log(req.body.uniqueid);
  const { uniqueid, replyMessage } = req.body;

  try {
    const updatedMessage = await Messages.findOneAndUpdate(
      { uniqueid: uniqueid },
      { $set: { replymesssage: replyMessage } }, // Update operation
      { new: true } // Options to return the updated document
    );

    if (updatedMessage) {
      // If the message was successfully updated, respond with the updated message
      res.status(200).json(updatedMessage);
    } else {
      res.status(404).send("Message not found");
    }
  } catch (err) {
    next(err);
  }
};

export const GetMessages = async (req, res, next) => {
  // console.log(req.params.id);
  try {
    // Use findOne to search for messages by uniqueid field
    const allmessages = await Messages.find({ uniqueid: req.params.id });
    // console.log(allmessages);
    if (allmessages) {
      res.status(200).json(allmessages);
    } else {
      res
        .status(404)
        .json({ message: "No messages found with the provided unique ID." });
    }
  } catch (err) {
    next(err); // Forward the error to the error-handling middleware
  }
};

export const getProviderMessages = async (req, res, next) => {
  // Destructure to get id directly from req.params
  const { id } = req.params;
  // console.log(id);

  try {
    // Finding messages by provider ID
    const providerMessages = await Messages.find({ providerId: id });

    if (providerMessages.length > 0) {
      res.status(200).json(providerMessages);
    } else {
      res
        .status(404)
        .json({ message: "No messages found with the provided unique ID." });
    }
  } catch (err) {
    next(err);
  }
};
