import mongoose from "mongoose";

const UserSettingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    privacy: {
        profileVisibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'public'
        },
        hideFollowerCounts: {
            type: Boolean,
            default: false
        },
        likedPostsVisibility: {
            type: String,
            enum: ['me', 'followers', 'everyone'],
            default: 'everyone'
        },
        blockedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    notifications: {
        notifyAbout: {
            likes: { type: Boolean, default: false },
            comments: { type: Boolean, default: false },
            newFollowers: { type: Boolean, default: false },
            mentions: { type: Boolean, default: false },
            shares: { type: Boolean, default: false },
            mute: { type: Boolean, default: false }
        },
        notificationFrequency: {
            type: String,
            enum: ['realTime', 'daily', 'dnd'],
            default: 'realTime'
        }
    },
    contentFiltering: {
        filterSettings: {
            type: String,
            enum: ['all', 'blockTags'],
            default: 'all'
        },
        hiddenTags: [{
            type: String
        }]
    },
    appearance: {
        theme: {
            type: String,
            enum: ['dark', 'light'],
            default: 'light'
        }
    },
    languageRegion: {
        language: {
            type: String,
            default: 'en'
        },
        region: {
            type: String,
            enum: ['us', 'uk', 'eu'],
            default: 'us'
        }
    }
}, { timestamps: true });

const userSettingsModel = mongoose.model('UserSettings', UserSettingsSchema);

export default userSettingsModel;