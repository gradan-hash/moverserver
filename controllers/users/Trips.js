import Trips from "../../models/clients/Trips";
import Items from "../../models/providers/Provideritems.js";
import Provider from "../../models/providers/Providers.js";
import createError from "../../utils/createError.js";
import user from "../../models/clients/Users";
export const createTrip = async (req, res, next) => {
  console.log(req.body);
  const newTrips = new Trips({
    ...req.body,
  });

  try {
    const savedTrips = await newTrips.save();
    res.status(200).json(savedTrips);
  } catch (err) {
    next(err);
  }
};

export const singleTrip = async (req, res, next) => {
  try {
    const trips = await Trips.findById(req.params.id);

    // Assuming trips is not null and has a valid ProviderId
    const Providerid = trips.providerid;
    const Itemid = trips.itemid;
    const Usernameid = trips.usernameid;

    const providerdetails = await Provider.findById(Providerid);
    const itemdetails = await Items.findById(Itemid);
    const userdetails = await user.findById(Usernameid);

    // Check if trips exists after fetching it
    if (!trips) return next(createError("Trip not found", 404));

    // Combining trips and providerdetails into a single response object
    const response = {
      userdetails,
      itemdetails,
      providerdetails,
    };
    // console.log(response);
    res.status(200).send(response); // Sending the combined object as response
  } catch (err) {
    next(err);
  }
};


export const getAllTrips = async (req, res, next) => {
  try {
    // Fetch all trips from the database
    const trips = await Trips.find({});
    
    // Use Promise.all to fetch all related details concurrently
    const tripsWithDetails = await Promise.all(trips.map(async (trip) => {
      const Providerid = trip.providerid;
      const Itemid = trip.itemid;
      const Usernameid = trip.usernameid;

      // Fetch provider, item, and user details concurrently for each trip
      const [providerdetails, itemdetails, userdetails] = await Promise.all([
        Provider.findById(Providerid),
        Items.findById(Itemid),
        user.findById(Usernameid),
      ]);

      // Return a new object combining the trip with its related details
      return {
        ...trip.toObject(), // Convert the mongoose document to a plain JavaScript object
        providerdetails,
        itemdetails,
        userdetails,
      };
    }));

    res.status(200).json(tripsWithDetails);
  } catch (err) {
    next(createError(500, "Failed to fetch trips and their details."));
  }
};