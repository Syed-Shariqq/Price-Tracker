import React, { useEffect, useState } from "react";
import { Lock, Trash2, Upload } from "lucide-react";
import { toast } from "react-toastify";
import {
  changePassword,
  fetchPriceNow,
  getProfile,
  getSettings,
  updateProfile,
  updateSettings,
} from "../Api/settings";
import Loader from "@/Components/Common/Loader";

const SettingsPage = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    username: "",
  });
  const [tempProfileData, setTempProfileData] = useState(profileData);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [notifications, setNotifications] = useState({
    priceDrops: true,
    priceIncreases: true,
    minDropPercentage: 10,
    method: "",
  });

  const [priceFetch, setPriceFetch] = useState({
    autoFetch: true,
    fetchInterval: "",
    lastFetch: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
      setPreviewImage(savedImage);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const data = res.data.data;

        setProfileData({
          name: data.name || "",
          email: data.email || "",
          username: data.username || "",
        });

        setTempProfileData({
          name: data.name || "",
          email: data.email || "",
          username: data.username || "",
        });
      } catch (err) {
        toast.error("Failed to fetch profile");
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleSettings = async () => {
      try {
        const res = await getSettings();
        const data = res.data.data;
        console.log("Fetched settings", data);

        setNotifications({
          priceDrops: data.notifyOnDrop ?? true,
          priceIncreases: data.notifyOnIncrease ?? true,
          minDropPercentage: data.minDropPercentage ?? 10,
          method: data.notificationMethod?.toLowerCase() ?? "email",
        });

        setPriceFetch({
          autoFetch: data.autoFetch ?? true,
          fetchInterval: data.fetchInterval ?? "6h",
          lastFetch: data.lastFetch
            ? new Date(data.lastFetch).toLocaleString()
            : "Never",
        });
      } catch (err) {
        toast.error("Failed to fetch settings");
        console.error("Failed to fetch settings", err);
      }
    };

    handleSettings();
  }, []);

  const saveSettings = async (updatedNotifications, updatedPriceFetch) => {
    try {
      await updateSettings({
        notifyOnDrop: updatedNotifications.priceDrops,
        notifyOnIncrease: updatedNotifications.priceIncreases,
        minDropPercentage: updatedNotifications.minDropPercentage,
        notificationMethod: updatedNotifications.method.toUpperCase(),
        autoFetch: updatedPriceFetch.autoFetch,
        fetchInterval: updatedPriceFetch.fetchInterval,
        lastFetch: updatedPriceFetch.lastFetch,
      });
      toast.success("Settings saved");
    } catch (err) {
      toast.error("Failed to save settings");
      console.error("Failed to save settings", err);
    }
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setTempProfileData(profileData);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await updateProfile({
        name: tempProfileData.name,
        username: tempProfileData.username,
      });

      if (res.status === 200) {
        toast.success("Profile updated successfully");

        setProfileData(tempProfileData); // update UI
        setIsEditingProfile(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      console.error("Failed to update profile", err);
    }
  };

  const handleCancelProfile = () => {
    setIsEditingProfile(false);
  };

  const handleProfileChange = (field, value) => {
    setTempProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = async (field, value) => {
    const previous = { ...notifications };
    const updated = { ...notifications, [field]: value };

    setNotifications(updated);
    try {
      await updateSettings({
        notifyOnDrop: updated.priceDrops,
        notifyOnIncrease: updated.priceIncreases,
        minDropPercentage: updated.minDropPercentage,
        notificationMethod: updated.method.toUpperCase(),
        autoFetch: priceFetch.autoFetch,
        fetchInterval: priceFetch.fetchInterval,
        lastFetch: priceFetch.lastFetch,
      });
      toast.success("Settings saved");
    } catch (err) {
      setNotifications(previous); // revert on failure
      toast.error("Failed to save settings");
      console.error("Failed to save settings", err);
    }
  };

  const handleFetchPrices = async () => {
    try {
      setLoading(true);
      const res = await fetchPriceNow();
      if (res.status === 200) {
        toast.success("Prices fetched successfully");
        setPriceFetch((prev) => ({
          ...prev,
          lastFetch: new Date().toLocaleString(),
        }));
      }
    } catch (err) {
      toast.error("Failed to fetch prices");
      console.error("Failed to fetch prices", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSecurityChange = (field, value) => {
    setSecurity({ ...security, [field]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File too large (max 2MB)");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result) {
        toast.error("Something went wrong");
        return;
      }

      const base64 = reader.result;
      setPreviewImage(base64);
      localStorage.setItem("profileImage", base64);
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
    };

    reader.readAsDataURL(file);
  };

  const handlePasswordUpdate = async () => {
    if (security.newPassword !== security.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setIsUpdatingPassword(true);

      const res = await changePassword({
        currentPassword: security.currentPassword,
        newPassword: security.newPassword,
      });

      if (res.status === 200) {
        toast.success("Password updated successfully");

        setSecurity({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
      setSecurity({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="w-full md:min-h-[200vh] min-h-[150vh] bg-gray-50 p-4 md:p-8 pb-20">
      {loading && <Loader />}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Settings
        </h1>
      </div>

      <div className="space-y-6 max-w-6xl">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Profile</h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-24 h-24 rounded-full 2xl:w-36 2xl:h-36 md:w-28 md:h-28 bg-blue-300 flex items-center justify-center text-white text-4xl font-bold mb-4">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full rounded-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white rounded-full text-4xl font-bold bg-blue-300 w-full h-full flex items-center justify-center">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition text-gray-700 text-sm">
                <Upload size={16} />
                Upload New Avatar
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Profile Fields */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={
                    isEditingProfile ? tempProfileData.name : profileData.name
                  }
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  disabled={!isEditingProfile}
                  className="text-sm w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  disabled={true}
                  value={
                    isEditingProfile ? tempProfileData.email : profileData.email
                  }
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  className="text-sm w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={
                    isEditingProfile
                      ? tempProfileData.username
                      : profileData.username
                  }
                  onChange={(e) =>
                    handleProfileChange("username", e.target.value)
                  }
                  disabled={!isEditingProfile}
                  className="text-sm w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {!isEditingProfile ? (
                  <button
                    onClick={handleEditProfile}
                    className="active:scale-95 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                  >
                    Update Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="active:scale-95 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelProfile}
                      className="active:scale-95 bg-gray-100 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Notifications
          </h2>

          <div className="space-y-4">
            {/* Toggle Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Notify when price drops
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.priceDrops}
                    onChange={(e) =>
                      handleNotificationChange("priceDrops", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between mt-4">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Notify when price increases
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.priceIncreases}
                    onChange={(e) =>
                      handleNotificationChange(
                        "priceIncreases",
                        e.target.checked,
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Minimum price drop percentage
                </label>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  {notifications.minDropPercentage}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={notifications.minDropPercentage}
                onChange={(e) =>
                  handleNotificationChange(
                    "minDropPercentage",
                    parseInt(e.target.value),
                  )
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Notification Method */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-3">
                Notification Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="notification-method"
                    value="email"
                    checked={notifications.method === "email"}
                    onChange={(e) =>
                      handleNotificationChange("method", e.target.value)
                    }
                    className="w-4 h-4"
                  />
                  <span className="md:text-lg text-gray-700">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="notification-method"
                    value="push"
                    checked={notifications.method === "push"}
                    onChange={(e) =>
                      handleNotificationChange("method", e.target.value)
                    }
                    className="w-4 h-4"
                  />
                  <span className="md:text-lg text-gray-700">Push</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Price Fetch Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Price Fetch</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                Auto Fetch Price
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={priceFetch.autoFetch}
                  onChange={async (e) => {
                    const previous = { ...priceFetch };
                    const updated = {
                      ...priceFetch,
                      autoFetch: e.target.checked,
                    };

                    setPriceFetch(updated);

                    try {
                      await updateSettings({
                        notifyOnDrop: notifications.priceDrops,
                        notifyOnIncrease: notifications.priceIncreases,
                        minDropPercentage: notifications.minDropPercentage,
                        notificationMethod: notifications.method.toUpperCase(),
                        autoFetch: updated.autoFetch,
                        fetchInterval: updated.fetchInterval,
                      });
                      toast.success("Settings saved");
                    } catch (err) {
                      setPriceFetch(previous); // revert on failure
                      toast.error("Failed to save settings");
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                Fetch Interval
              </label>
              <select
                value={priceFetch.fetchInterval}
                onChange={async (e) => {
                  const previous = { ...priceFetch };
                  const updated = {
                    ...priceFetch,
                    fetchInterval: e.target.value,
                  };

                  setPriceFetch(updated);

                  try {
                    await updateSettings({
                      notifyOnDrop: notifications.priceDrops,
                      notifyOnIncrease: notifications.priceIncreases,
                      minDropPercentage: notifications.minDropPercentage,
                      notificationMethod: notifications.method.toUpperCase(),
                      autoFetch: updated.autoFetch,
                      fetchInterval: updated.fetchInterval,
                    });
                    toast.success("Settings saved");
                  } catch (err) {
                    setPriceFetch(previous); // revert on failure
                    toast.error("Failed to save settings");
                  }
                }}
                className="text-sm w-full md:w-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="6h">6 hours</option>
                <option value="12h">12 hours</option>
                <option value="24h">24 hours</option>
                <option value="3d">3 days</option>
                <option value="1w">1 week</option>
              </select>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Last Fetch:{" "}
                <span className="font-bold text-gray-900">
                  {priceFetch.lastFetch}
                </span>
              </p>
              <button
                onClick={handleFetchPrices}
                className="active:scale-95 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
              >
                Fetch Now
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock size={20} className="text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800">Security</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  disabled={isUpdatingPassword ? false : true}
                  placeholder="••••••••"
                  value={security.currentPassword}
                  onChange={(e) =>
                    handleSecurityChange("currentPassword", e.target.value)
                  }
                  className="w-full disabled:bg-gray-50 disabled:text-gray-600 px-4 py-2  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  disabled={isUpdatingPassword ? false : true}
                  value={security.newPassword}
                  onChange={(e) =>
                    handleSecurityChange("newPassword", e.target.value)
                  }
                  className="w-full disabled:bg-gray-50 disabled:text-gray-600 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  disabled={isUpdatingPassword ? false : true}
                  value={security.confirmPassword}
                  onChange={(e) =>
                    handleSecurityChange("confirmPassword", e.target.value)
                  }
                  className="w-full disabled:bg-gray-50 disabled:text-gray-600 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {isUpdatingPassword ? (
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={handlePasswordUpdate}
                    className="active:scale-95 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsUpdatingPassword((prev) => !prev)}
                    className="active:scale-95 bg-gray-100 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsUpdatingPassword((prev) => !prev)}
                  className="active:scale-95 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  Update Password
                </button>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white mb-40 rounded-2xl shadow-lg p-6 md:p-8 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-6">
              <Trash2 size={20} className="text-red-500" />
              <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
            </div>

            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                This action cannot be undone. Please ensure this is what you
                want to do.
              </p>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-semibold flex items-center justify-center gap-2">
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
