import Messages from "../../models/clients/Messages.js";
import Providers from "../../models/providers/Providers.js";
import Users from "../../models/clients/Users.js";

export const createMessage = async (req, res, next) => {
  const { clientid, providerid, message, sender } = req.body;

  // Concatenate clientid and providerid to create a unique ID
  const uniqueid = `${clientid}${providerid}`;

  try {
    const existingConversation = await Messages.findOne({ uniqueid: uniqueid });

    if (existingConversation) {
      // If conversation exists, push new message into messages array
      existingConversation.messages.push({ message, sender });
      const savedMessage = await existingConversation.save();
      res.status(200).json(savedMessage);
    } else {
      // If no conversation exists, create new one
      const newMessage = new Messages({
        clientid,
        providerid,
        uniqueid,
        messages: [{ message, sender }],
      });
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    }
  } catch (err) {
    next(err);
  }
};

export const updateReplyMessage = async (req, res, next) => {
  const { uniqueid, replyMessage, sender } = req.body;
  console.log(req.body);
  try {
    const updatedMessage = await Messages.findOneAndUpdate(
      { uniqueid: uniqueid },
      { $push: { replies: { replyMessage, sender } } },
      { new: true }
    );

    if (updatedMessage) {
      res.status(200).json(updatedMessage);
    } else {
      res.status(404).send("Message not found");
    }
  } catch (err) {
    next(err);
  }
};

export const GetMessages = async (req, res, next) => {
  try {
    // Use findOne to search for messages by uniqueid field and sort them by createdAt in descending order
    const allmessages = await Messages.find({ uniqueid: req.params.id }).sort({
      createdAt: -1,
    });
    if (allmessages) {
      res.status(200).json(allmessages);
    } else {
      res
        .status(404)
        .json({ message: "No messages found with the provided unique ID." });
    }
  } catch (err) {
    next(err);
  }
};
export const getProviderMessages = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Finding messages by provider ID and sorting them by createdAt in descending order
    const providerMessages = await Messages.find({ providerId: id }).sort({
      createdAt: -1,
    });

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
