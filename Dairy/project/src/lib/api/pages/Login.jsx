import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { signInWithPhone, verifyOTP } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithPhone(phone);
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyOTP(phone, otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome back</h1>
            <p className='text-gray-600'>Sign in to continue to Life Journal</p>
          </div>

          {error && (
            <div className='mb-4 p-4 text-sm text-red-700 bg-red-50 rounded-lg'>{error}</div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className='space-y-6'>
              <div>
                <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
                  Phone Number
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Phone className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='phone'
                    type='tel'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='+1234567890'
                    required
                    className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                {loading ? (
                  <Loader2 className='w-5 h-5 animate-spin' />
                ) : (
                  <>
                    Continue
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className='space-y-6'>
              <div>
                <label htmlFor='otp' className='block text-sm font-medium text-gray-700 mb-2'>
                  Verification Code
                </label>
                <input
                  id='otp'
                  type='text'
                  inputMode='numeric'
                  autoComplete='one-time-code'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder='Enter 6-digit code'
                  required
                  className='block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : 'Verify Code'}
              </button>
            </form>
          )}

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Don't have an account?{' '}
              <Link to='/register' className='font-medium text-blue-600 hover:text-blue-500'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
