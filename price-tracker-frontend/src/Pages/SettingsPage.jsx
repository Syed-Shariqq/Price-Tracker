import React, { useState } from 'react'
import { Lock, Trash2, Upload } from 'lucide-react'

const SettingsPage = () => {

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Syed Shariq',
    email: 'shariq@email.com',
    username: 'shariq_dev'
  })
  const [tempProfileData, setTempProfileData] = useState(profileData)

  const [notifications, setNotifications] = useState({
    priceDrops: true,
    priceIncreases: true,
    minDropPercentage: 10,
    method: 'email'
  })

  const [priceFetch, setPriceFetch] = useState({
    autoFetch: true,
    fetchInterval: '6 hours',
    lastFetch: 'Apr 20 • 10:46 AM'
  })

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleEditProfile = () => {
    setIsEditingProfile(true)
    setTempProfileData(profileData)
  }

  const handleSaveProfile = () => {
    setProfileData(tempProfileData)
    setIsEditingProfile(false)
  }

  const handleCancelProfile = () => {
    setIsEditingProfile(false)
  }

  const handleProfileChange = (field, value) => {
    setTempProfileData({ ...tempProfileData, [field]: value })
  }

  const handleNotificationChange = (field, value) => {
    setNotifications({ ...notifications, [field]: value })
  }


  const handleSecurityChange = (field, value) => {
    setSecurity({ ...security, [field]: value })
  }

  const handleUpdatePassword = () => {
    if (security.newPassword === security.confirmPassword) {
      setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setIsUpdatingPassword(prev => !prev)
      alert("Password updated successfully")
    }else{
      alert("Password do not match")
    }
  }

  return (
    <div className='w-full md:min-h-[200vh] min-h-[150vh] bg-gray-50 p-4 md:p-8 pb-20'>
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>Settings</h1>
      </div>

      <div className='space-y-6 max-w-6xl'>
        {/* Profile Section */}
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
          <h2 className='font-bold text-xl 2xl:text-4xl md:text-2xl mb-6 text-gray-900'>Profile</h2>
          
          <div className='flex flex-col md:flex-row gap-6'>
            {/* Avatar */}
            <div className='flex flex-col items-center md:items-start'>
              <div className='w-24 h-24 2xl:w-36 2xl:h-36 md:w-28 md:h-28 bg-blue-300 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4'>
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className='flex 2xl:text-lg items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition text-gray-700 text-sm'>
                <Upload size={16} />
                Upload New Avatar
              </button>
            </div>

            {/* Profile Fields */}
            <div className='flex-1 space-y-4'>
              <div>
                <label className='block text-sm md:text-lg 2xl:text-2xl font-semibold text-gray-700 mb-2'>Name</label>
                <input
                  type='text'
                  value={isEditingProfile ? tempProfileData.name : profileData.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  disabled={!isEditingProfile}
                  className='w-full px-4 py-2 2xl:text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600'
                />
              </div>

              <div>
                <label className='block text-sm md:text-lg 2xl:text-2xl font-semibold text-gray-700 mb-2'>Email</label>
                <input
                  type='email'
                  value={isEditingProfile ? tempProfileData.email : profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  disabled={!isEditingProfile}
                  className='w-full px-4 py-2 2xl:text-xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600'
                />
              </div>

              <div>
                <label className='block md:text-lg 2xl:text-2xl text-sm font-semibold text-gray-700 mb-2'>Username</label>
                <input
                  type='text'
                  value={isEditingProfile ? tempProfileData.username : profileData.username}
                  onChange={(e) => handleProfileChange('username', e.target.value)}
                  disabled={!isEditingProfile}
                  className='w-full 2xl:text-xl px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-600'
                />
              </div>

              {/* Action Buttons */}
              <div className='flex gap-3 pt-4'>
                {!isEditingProfile ? (
                  <button
                    onClick={handleEditProfile}
                    className='active:scale-95 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold'
                  >
                    Update Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className='bg-green-500 active:scale-95 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold'
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelProfile}
                      className='active:scale-95 bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold'
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
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
          <h2 className='font-bold 2xl:text-4xl text-xl md:text-2xl mb-6 text-gray-900'>Notifications</h2>

          <div className='space-y-4'>
            {/* Toggle Options */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <label className='text-gray-700 2xl:text-2xl font-semibold'>Notify when price drops</label>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={notifications.priceDrops}
                    onChange={(e) => handleNotificationChange('priceDrops', e.target.checked)}
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className='flex items-center justify-between'>
                <label className='text-gray-700 2xl:text-2xl font-semibold'>Notify when price increases</label>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={notifications.priceIncreases}
                    onChange={(e) => handleNotificationChange('priceIncreases', e.target.checked)}
                    className='sr-only peer'
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>

            {/* Minimum Price Drop */}
            <div className='pt-4'>
              <div className='flex items-center justify-between mb-2'>
                <label className='text-gray-700 2xl:text-xl font-semibold'>Minimum price drop percentage</label>
                <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold'>{notifications.minDropPercentage}%</span>
              </div>
              <input
                type='range'
                min='1'
                max='50'
                value={notifications.minDropPercentage}
                onChange={(e) => handleNotificationChange('minDropPercentage', parseInt(e.target.value))}
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500'
              />
            </div>

            {/* Notification Method */}
            <div className='pt-4 border-t border-gray-200'>
              <label className='block 2xl:text-xl text-gray-700 font-semibold mb-3'>Notification Method</label>
              <div className='flex gap-4'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='radio'
                    name='notification-method'
                    value='email'
                    checked={notifications.method === 'email'}
                    onChange={(e) => handleNotificationChange('method', e.target.value)}
                    className='w-4 h-4'
                  />
                  <span className='2xl:text-xl md:text-lg text-gray-700'>Email</span>
                </label>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='radio'
                    name='notification-method'
                    value='push'
                    checked={notifications.method === 'push'}
                    onChange={(e) => handleNotificationChange('method', e.target.value)}
                    className='w-4 h-4'
                  />
                  <span className='2xl:text-xl md:text-lgtext-gray-700'>Push</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Price Fetch Section */}
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
          <h2 className='font-bold 2xl:text-4xl text-xl md:text-2xl mb-6 text-gray-900'>Price Fetch</h2>

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <label className='text-gray-700 md:text-lg 2xl:text-2xl font-semibold'>Auto Fetch Price</label>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={priceFetch.autoFetch}
                  onChange={(e) => setPriceFetch({ ...priceFetch, autoFetch: e.target.checked })}
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Fetch Interval</label>
              <select className='w-full md:w-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700'>
                <option>6 hours</option>
                <option>12 hours</option>
                <option>24 hours</option>
                <option>3 days</option>
                <option>1 week</option>
              </select>
            </div>

            <div className='pt-2'>
              <p className='text-gray-600 text-sm mb-4'>Last Fetch: <span className='font-semibold text-gray-800'>{priceFetch.lastFetch}</span></p>
              <button className='active:scale-95 bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold'>
                Fetch Now
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
            <div className='flex items-center gap-2 mb-6'>
              <Lock size={24} className='text-blue-500' />
              <h2 className='font-bold 2xl:text-4xl text-xl md:text-2xl text-gray-900'>Security</h2>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm md:text-md 2xl:text-2xl font-semibold text-gray-700 mb-2'>Current Password</label>
                <input
                  type='password'
                  disabled={isUpdatingPassword ? false : true}
                  placeholder='••••••••'
                  value={security.currentPassword}
                  
                  onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                  className='w-full disabled:bg-gray-50 disabled:text-gray-600 px-4 py-2  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm md:text-md 2xl:text-2xl font-semibold text-gray-700 mb-2'>New Password</label>
                <input
                  type='password'
                  placeholder='••••••••'
                  disabled={isUpdatingPassword ? false : true}
                  value={security.newPassword}
                  onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                  className='w-full disabled:bg-gray-50 disabled:text-gray-600 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-semibold md:text-md 2xl:text-2xl text-gray-700 mb-2'>Confirm Password</label>
                <input
                  type='password'
                  placeholder='••••••••'
                  disabled={isUpdatingPassword ? false : true}
                  value={security.confirmPassword}
                  onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
                  className='w-full disabled:bg-gray-50 disabled:text-gray-600 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {isUpdatingPassword ? (
                <div className='flex items-center justify-between'>
                  <button 
                  onClick={handleUpdatePassword}
                  className='active:scale-95 mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold'>
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsUpdatingPassword(prev => !prev)}
                   className='active:scale-95 mt-6 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold'>
                    Cancel
                  </button>
                </div>
              ): (
                <button
                onClick={() => setIsUpdatingPassword(prev => !prev)}
                className='w-full active:scale-95 2xl:px-8 2xl:py-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold mt-6'
              >
                Update Password
              </button>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className='bg-white mb-40 rounded-2xl shadow-lg p-6 md:p-8 border-2 border-red-200'>
            <div className='flex items-center gap-2 mb-6'>
              <Trash2 size={24} className='text-red-500' />
              <h2 className='font-bold 2xl:text-4xl text-xl md:text-2xl text-gray-900'>Danger Zone</h2>
            </div>

            <div className='bg-red-50 p-4 rounded-lg mb-4'>
              <p className='text-gray-700 2xl:text-xl text-sm mb-4'>This action cannot be undone. Please ensure this is what you want to do.</p>
              <button className='w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-semibold flex items-center justify-center gap-2'>
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
