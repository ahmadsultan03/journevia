import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const getUsers = async (req, res, next) => {
    const userId = req.user.id;

    const ValidUser = await User.findOne({ _id: userId });

    if (!ValidUser) {
        return next(errorHandler(401, 'Unauthorized!'));
    }

    const {password:pass, ...rest} = ValidUser._doc;

    res.status(200).json(rest);
}