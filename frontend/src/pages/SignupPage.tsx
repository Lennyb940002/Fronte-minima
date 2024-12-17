import React, { useState } from 'react';

const SignupPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    const handleSignIn = () => {
        setStep(2);
    };

    const handleInitializeAccount = () => {
        // Logique pour l'initialisation du compte
        alert('Compte initialisé');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/74/Apple_logo_black.svg"
                        alt="Logo"
                        className="h-16"
                    />
                </div>

                {step === 1 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nom d'utilisateur"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Clé secrète</label>
                                <input
                                    type="password"
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Clé secrète"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSignIn}
                                className="w-full py-2 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">Initialiser le compte</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    value={username}
                                    readOnly
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nouveau mot de passe"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirmer le mot de passe"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Âge</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Âge"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Adresse email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Adresse email"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleInitializeAccount}
                                className="w-full py-2 mt-6 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                            >
                                Initialiser le compte
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupPage;
