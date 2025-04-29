import UserSettings from '../Models/userSettingsModel.js';

export const createSetting = async (req, res) => {
    try {
        const newSetting = new UserSettings(req.body);
        await newSetting.save();
        res.status(201).json(newSetting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSetting = async (req, res) => {
    try {
        // Using userId as the identifier
        const setting = await UserSettings.findOne({ userId: req.params.id });
        if (!setting) {
            return res.status(404).json({ message: "User settings not found" });
        }
        res.status(200).json(setting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSetting = async (req, res) => {
    try {
        const updatedSetting = await UserSettings.findOneAndUpdate(
            { userId: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!updatedSetting) {
            return res.status(404).json({ message: "User settings not found" });
        }
        res.status(200).json(updatedSetting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSetting = async (req, res) => {
    try {
        const deletedSetting = await UserSettings.findOneAndDelete({ userId: req.params.id });
        if (!deletedSetting) {
            return res.status(404).json({ message: "User settings not found" });
        }
        res.status(200).json({ message: "User settings deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};