import React, { useState } from 'react';

const Onboarding: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [visibility, setVisibility] = useState('everyone');
  const [notifications, setNotifications] = useState({
    messages: true,
    requests: true,
    updates: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      email,
      username,
      password,
      profilePicture,
      bio,
      visibility,
      notifications
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to ChatSecure!</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        
        {/* Step 1: Create Your Account */}
        <h2 className="text-xl font-semibold mb-4">Step 1: Create Your Account</h2>
        <input
          type="email"
          placeholder="Email Address"
          className="input w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="input w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input w-full mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full mb-4">Create Account</button>

        {/* Step 2: Set Up Your Profile */}
        <h2 className="text-xl font-semibold mb-4">Step 2: Set Up Your Profile</h2>
        <input
          type="file"
          onChange={(e) => e.target.files && setProfilePicture(e.target.files[0])}
          className="file-input file-input-bordered w-full mb-4"
        />
        <textarea
          placeholder="About Me (optional)"
          className="textarea w-full mb-4"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <label className="label">
          <span className="label-text">Online Status Visibility</span>
        </label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="select select-bordered w-full mb-4"
        >
          <option value="everyone">Everyone</option>
          <option value="friends">Friends Only</option>
          <option value="nobody">Nobody</option>
        </select>
        
        <label className="label">
          <span className="label-text">Notification Preferences</span>
        </label>
        <div className="form-control mb-4">
          <label className="cursor-pointer label">
            <span className="label-text">New Messages</span>
            <input
              type="checkbox"
              checked={notifications.messages}
              onChange={() => setNotifications({ ...notifications, messages: !notifications.messages })}
              className="toggle"
            />
          </label>
          <label className="cursor-pointer label">
            <span className="label-text">Friend Requests</span>
            <input
              type="checkbox"
              checked={notifications.requests}
              onChange={() => setNotifications({ ...notifications, requests: !notifications.requests })}
              className="toggle"
            />
          </label>
          <label className="cursor-pointer label">
            <span className="label-text">Other Updates</span>
            <input
              type="checkbox"
              checked={notifications.updates}
              onChange={() => setNotifications({ ...notifications, updates: !notifications.updates })}
              className="toggle"
            />
          </label>
        </div>

        {/* Get Started Button */}
        <button type="submit" className="btn btn-secondary w-full">Continue to Chat</button>
      </form>
    </div>
  );
};

export default Onboarding;