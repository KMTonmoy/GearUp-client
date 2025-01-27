import { useEffect, useState } from 'react';
import useUserRole from '../hook/useUserRole';

const Profile = () => {
    const { email } = useUserRole();
    const [userData, setUserData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://gearupserver.vercel.app/api/usersgetall');
                const data = await response.json();
                const currentUser = data.data.filter((user: { email: string }) => user.email === email)[0];
                setUserData(currentUser);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [email]);

    const handleUpdateProfile = async () => {
        if (!oldPassword || !newPassword) {
            return alert('Please provide both old and new passwords');
        }

        const updatedUserData = { currentPassword: oldPassword, newPassword };

        // Retrieve the auth data from localStorage
        const persistAuth = localStorage.getItem('persist:auth');
        if (persistAuth) {
            const parsedAuth = JSON.parse(persistAuth);
            const token = JSON.parse(parsedAuth.token);
            if (!token) {
                return alert('No token found. Please log in again.');
            }
            console.log(token)
            try {
                const response = await fetch(`https://gearupserver.vercel.app/api/user/${userData._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedUserData),
                });

                const data = await response.json();

                if (data.success) {
                    setUserData({ ...userData });
                    setIsModalOpen(false);
                } else {
                    alert(data.message || 'Error updating password');
                }
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        } else {
            alert('No authentication data found in localStorage.');
        }
    };

    if (isLoading) {
        return <div className="text-center text-lg text-gray-500">Loading user data...</div>;
    }

    if (!userData) {
        return <div className="text-center text-lg text-gray-500">User not found.</div>;
    }

    return (
        <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto bg-white rounded-lg shadow-lg">
                <div className="bg-blue-500 text-white rounded-t-lg py-12 text-center">
                    <img
                        src={"https://cdn-icons-png.flaticon.com/512/9187/9187604.png"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-semibold">{userData.fullName || 'John Doe'}</h1>
                    <p className="mt-2 text-lg">{userData.email}</p>
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4">
                            <span className="font-medium text-gray-700">Full Name:</span>
                            <span className="text-gray-500">{userData.name || 'John Doe'}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="text-gray-500">{userData.email}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-medium text-gray-700">Phone Number:</span>
                            <span className="text-gray-500">{userData.phoneNumber || '+123 456 7890'}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-medium text-gray-700">Location:</span>
                            <span className="text-gray-500">{userData.location || 'New York, USA'}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-8 py-6 rounded-b-lg flex justify-between">
                    <button
                        className="text-white bg-blue-600 px-6 py-2 rounded-lg text-lg hover:bg-blue-700 transition"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Edit Profile
                    </button>
                    <button className="text-white bg-red-600 px-6 py-2 rounded-lg text-lg hover:bg-red-700 transition">
                        Log Out
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Profile</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700">Old Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full p-2 border rounded-lg mt-2"
                                placeholder="Enter old password"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border rounded-lg mt-2"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                onClick={handleUpdateProfile}
                            >
                                Save Changes
                            </button>
                            <button
                                className="text-white bg-gray-600 px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
