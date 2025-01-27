import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface User {
    _id: string;
    name: string;
    isBlocked: boolean;
    email: string
}

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://gearupserver.vercel.app/api/usersgetall');
                setUsers(response.data.data);
            } catch (error) {
                toast.error('Failed to fetch users!');
            }
        };

        fetchUsers();
    }, []);

    const handleBlock = async (userId: string) => {
        try {
            const persistAuth = localStorage.getItem('persist:auth');
            if (!persistAuth) {
                toast.error('No authorization token found!');
                return;
            }

            const parsedAuth = JSON.parse(persistAuth);
            const token = parsedAuth.token.replace(/"/g, '');

            const response = await axios.patch(
                `https://gearupserver.vercel.app/api/admin/users/${userId}/block`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setUsers(users.map((user) =>
                    user._id === userId ? { ...user, isBlocked: true } : user
                ));
                toast.success('User blocked successfully!');
            }
        } catch (error) {
            toast.error('Error blocking user!');
        }
    };

    const handleUnblock = async (userId: string) => {
        try {
            const persistAuth = localStorage.getItem('persist:auth');
            if (!persistAuth) {
                toast.error('No authorization token found!');
                return;
            }

            const parsedAuth = JSON.parse(persistAuth);
            const token = parsedAuth.token.replace(/"/g, '');

            const response = await axios.patch(
                `https://gearupserver.vercel.app/api/admin/users/${userId}/unblock`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setUsers(users.map((user) =>
                    user._id === userId ? { ...user, isBlocked: false } : user
                ));
                toast.success('User unblocked successfully!');
            }
        } catch (error) {
            toast.error('Error unblocking user!');
        }
    };

    const confirmBlock = (userId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to block this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, block it!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleBlock(userId);
            }
        });
    };

    const confirmUnblock = (userId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to unblock this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, unblock it!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleUnblock(userId);
            }
        });
    };

    return (
        <div className="w-full mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">Manage Users</h2>

            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-red-600">Unblocked Users</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {users
                        .filter((user) => !user.isBlocked)
                        .map((user) => (
                            <div key={user._id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-medium text-gray-800">Name: {user.name}</span>
                                    <span className="text-lg font-medium text-gray-800">Email: {user.email}</span>
                                </div>
                                <button
                                    onClick={() => confirmBlock(user._id)}
                                    className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                                >
                                    Block
                                </button>
                            </div>
                        ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-green-600">Blocked Users</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {users
                        .filter((user) => user.isBlocked)
                        .map((user) => (
                            <div key={user._id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-medium text-gray-800">Name: {user.name}</span>
                                    <span className="text-lg font-medium text-gray-800">Email: {user.email}</span>
                                </div>
                                <button
                                    onClick={() => confirmUnblock(user._id)}
                                    className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-200"
                                >
                                    Unblock
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
