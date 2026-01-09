import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import InputGroup from '../../../components/InputGroup';
import { validatePassword } from '../../../utils/passwordValidator';
import { useAppSelector } from '../../../store/hooks';
import { apiClient } from '../../../services/apiClient';

const NewPasswordPage: React.FC = () => {
	const navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const reduxEmail = useAppSelector((state) => state.registration.userEmail);
	const emailFromState = (location.state as any)?.email as string | undefined;
	const email = emailFromState || reduxEmail;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const validation = validatePassword(password);
		if (!validation.isStrong) {
			setError((validation.errors || []).join('; '));
			return;
		}
		if (password !== confirm) {
			setError('Passwords do not match');
			return;
		}

		if (!email) {
			setError('Missing email. Please restart the forgot-password flow.');
			return;
		}

		try {
			setLoading(true);
			console.log('Calling ForgotPassword API with', { email, password });
			await apiClient.post<any>('/User/ForgotPassword', { email, password });
			window.alert('Password updated successfully');
			setSuccess(true);
		} catch (err: any) {
			setError(err?.message || 'Failed to update password. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<div className="flex items-center justify-center bg-slate-50/50 py-12 px-4">
				<div className="max-w-xl w-full">
					<div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10 text-center">
						<div className="flex items-center justify-center mb-6">
							<CheckCircle size={40} className="text-green-600" />
						</div>
						<h1 className="text-2xl font-black text-slate-900 mb-2">Password Updated</h1>
						<p className="text-sm text-slate-500 mb-6">Your password has been updated successfully. You can now sign in with your new password.</p>
						<button
							className="w-full bg-[#003399] hover:bg-[#002266] text-white py-3 rounded-[2rem] font-black"
							onClick={() => navigate('/')}
						>
							Go to Sign in
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center bg-slate-50/50 py-12 px-4">
			<div className="max-w-xl w-full">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10">
						<div className="flex items-center gap-3 mb-6">
							<ShieldCheck size={28} className="text-[#003399]" />
							<div>
								<h1 className="text-2xl font-black text-slate-900">Set New Password</h1>
								<p className="text-sm text-slate-500">Choose a strong new password for your account</p>
							</div>
						</div>

						{error && (
							<div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-3">
								{error}
							</div>
						)}

						<div className="space-y-4">
							<InputGroup
								label="New password"
								name="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="Enter new password"
							/>

							<InputGroup
								label="Confirm password"
								name="confirm"
								type="password"
								value={confirm}
								onChange={(e) => setConfirm(e.target.value)}
								required
								placeholder="Confirm new password"
							/>
						</div>
					</div>

					<button
						type="submit"
						className="cursor-pointer w-full bg-[#003399] hover:bg-[#002266] disabled:opacity-50 disabled:grayscale text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/20 transition-all active:scale-[0.98]"
					>
						Set password
					</button>
				</form>
			</div>
		</div>
	);
};

export default NewPasswordPage;
