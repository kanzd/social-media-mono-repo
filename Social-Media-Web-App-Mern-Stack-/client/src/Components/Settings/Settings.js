import React from "react";
import { deleteUser } from "../../actions/UserAction";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import "./Settings.css";

const Settings = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id;
    const { user } = useSelector((state) => state.authReducer.authData);

    return (
        <div className="Settings">
            <h2 className="settings-heading">User Settings</h2>

            {/* 1. Privacy & Account Visibility */}
            <div className="settings-section">
                <h3>Privacy & Account Visibility</h3>
                <div className="section-group">
                        <p>Profile Visibility:</p>
                        <label>
                            <input type="radio" className="tab" name="profileVisibility" value="public" /> Public
                        </label>
                        <label>
                            <input type="radio" className="tab" name="profileVisibility" value="private" /> Private
                        </label>
                        <p className="help-text">
                            Private: Only approved followers can view content.
                        </p>
                </div>
                <div className="section-group">
                        <label>
                            <input type="checkbox" className="tab"/> Hide follower and following counts
                        </label>
                </div>
                <div className="section-group">
                        <p>Hide Liked Posts:</p>
                        <label>
                            <input type="radio" className="tab" name="likedPostsVisibility" value="me" /> Only Me
                        </label>
                        <label>
                            <input type="radio" className="tab" name="likedPostsVisibility" value="followers" /> Followers
                        </label>
                        <label>
                            <input type="radio" className="tab" name="likedPostsVisibility" value="everyone" /> Everyone
                        </label>
                </div>
                <div className="section-group">
                        <p>Block User:</p>
                        <input className="tab" type="text" placeholder="Enter username to block" />
                        <button type="button">Block</button>
                </div>
                <div className="section-group">
                        <p>Blocked Users:</p>
                        <ul>
                                {/* This would be dynamically generated */}
                                <li>
                                    JohnDoe{" "}
                                    <button type="button">Unblock</button>
                                </li>
                                <li>
                                    JaneSmith{" "}
                                    <button type="button">Unblock</button>
                                </li>
                        </ul>
                </div>
            </div>

            {/* 2. Notification Preferences */}
            <div className="settings-section">
                <h3>Notification Preferences</h3>
                <div className="section-group">
                    <p>Notify About:</p>
                        <label>
                            <input type="checkbox" className="tab" /> Likes on posts
                        </label>
                        <label>
                            <input type="checkbox" className="tab" /> Comments
                        </label>
                        <label>
                            <input type="checkbox" className="tab" /> New followers
                        </label>
                        <label>
                            <input type="checkbox" className="tab" /> Mentions
                        </label>
                        <label>
                            <input type="checkbox" className="tab" /> Shares (if enabled)
                        </label>
                        <label>
                            <input type="checkbox" className="tab"/> Mute All Notifications (temporary)
                        </label>
                </div>
                <div className="section-group">
                        <p>Notification Frequency:</p>
                        <label>
                            <input type="radio" className="tab" name="notifFrequency" value="realTime" /> Real-Time
                        </label>
                        <label>
                            <input type="radio" className="tab" name="notifFrequency" value="daily" /> Daily Summary
                        </label>
                        <label>
                            <input type="radio" className="tab" name="notifFrequency" value="dnd" /> Do Not Disturb
                        </label>
                </div>
            </div>

            {/* 3. Password & Account Security */}
            <div className="settings-section">
                <h3>Password & Account Security</h3>
                <div className="section-group">
                        <button type="button">Change Password</button>
                </div>
                <div className="section-group">
                        <button type="button">Log Out from Other Sessions/Devices</button>
                </div>
                <div className="section-group">
                        <button
                            type="button"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Are you sure you want to delete your account? This action cannot be undone."
                                    )
                                ) {
                                    dispatch(deleteUser(user._id));
                                    Navigate("/auth");
                                    alert("Account deleted successfully.");
                                }
                            }}
                        >
                            Delete Account
                        </button>
                </div>
            </div>

            {/* 4. Content Filtering / Parental Controls */}
            <div className="settings-section">
                <h3>Content Filtering / Parental Controls</h3>
                <div className="section-group">
                        <p>Filter Settings:</p>
                        <label>
                            <input type="radio" name="contentFilter" value="all" defaultChecked /> Show All Content
                        </label>
                        <label>
                            <input type="radio" name="contentFilter" value="blockTags" /> Block content by tags/categories
                        </label>
                </div>
                <div className="section-group">
                        <p>Select Tags to Hide:</p>
                        <label>
                            <input type="checkbox" name="tags" value="fetish" /> #fetish
                        </label>
                        <label>
                            <input type="checkbox" name="tags" value="BDSM" /> #BDSM
                        </label>
                        <label>
                            <input type="checkbox" name="tags" value="footfetish" /> #footfetish
                        </label>
                        {/* Optionally, an input to add custom tags */}
                        <input type="text" placeholder="Add custom tag" />
                </div>
            </div>

            {/* 5. Appearance Preferences */}
            <div className="settings-section">
                <h3>Appearance Preferences</h3>
                <div className="section-group">
                        <p>Theme:</p>
                        <label>
                            <input type="radio" name="theme" value="dark" /> Dark Mode
                        </label>
                        <label>
                            <input type="radio" name="theme" value="light" /> Light Mode
                        </label>
                </div>
            </div>

            {/* 6. Terms, Policies & Help */}
            <div className="settings-section">
                <h3>Terms, Policies & Help</h3>
                <ul>
                        <li>
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/community-guidelines" target="_blank" rel="noopener noreferrer">
                                Community Guidelines
                            </a>
                        </li>
                        <li>
                            <a href="/report-problem" target="_blank" rel="noopener noreferrer">
                                Report a Problem / Contact Support
                            </a>
                        </li>
                        <li>
                            <a href="/help-center" target="_blank" rel="noopener noreferrer">
                                Help Center
                            </a>
                        </li>
                </ul>
            </div>

            {/* 7. Language & Region Settings */}
            <div className="settings-section">
                <h3>Language & Region Settings</h3>
                <div className="section-group">
                        <label>
                            Interface Language:
                            <select name="language">
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                {/* Add more languages as needed */}
                            </select>
                        </label>
                </div>
                <div className="section-group">
                        <label>
                            Regional Preferences:
                            <select name="region">
                                <option value="us">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="eu">Europe</option>
                                {/* Add more regions as needed */}
                            </select>
                        </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;