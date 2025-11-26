'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockApi } from '@/lib/mockApi';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterVendorPage() {
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    businessPhone: '',
    businessEmail: '',
    businessAddress: '',
    serviceArea: '',
    serviceType: '',
    description: '',
    website: '',
    instagram: '',
    facebook: '',
    linkedin: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?message=Please login first to become a vendor');
    }
  }, [authLoading, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to register as a vendor');
      return;
    }

    setLoading(true);

    try {
      await mockApi.registerVendor(user.id, {
        businessName: formData.businessName,
        contactName: formData.contactName,
        businessPhone: formData.businessPhone,
        businessEmail: formData.businessEmail,
        businessAddress: formData.businessAddress,
        serviceArea: formData.serviceArea,
        serviceType: formData.serviceType,
        description: formData.description,
        website: formData.website,
        instagram: formData.instagram,
        facebook: formData.facebook,
        linkedin: formData.linkedin,
      });

      // Force a page reload to update the auth context with new role
      window.location.href = '/dashboard/vendor?registered=true';
    } catch (err: any) {
      setError(err.message || 'Vendor registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render form if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8">
          <div>
            <h2 className="text-center text-4xl font-extrabold text-white mb-2">
              Become a Vendor
            </h2>
            <p className="text-center text-sm text-gray-300">
              Register your business with us
            </p>
            {user && (
              <p className="text-center text-xs text-gray-400 mt-2">
                Registering as: <span className="text-pink-300 font-semibold">{user.fullName}</span>
              </p>
            )}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-4">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-200 mb-2">
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-200 mb-2">
                    Contact Name
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-200 mb-2">
                    Business Email
                  </label>
                  <input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    required
                    value={formData.businessEmail}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="contact@business.com"
                  />
                </div>

                <div>
                  <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-200 mb-2">
                    Business Phone
                  </label>
                  <input
                    id="businessPhone"
                    name="businessPhone"
                    type="tel"
                    required
                    value={formData.businessPhone}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="+1 (800) 555-0199"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-200 mb-2">
                  Business Address
                </label>
                <input
                  id="businessAddress"
                  name="businessAddress"
                  type="text"
                  required
                  value={formData.businessAddress}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="123 Business Ave, City, State"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-200 mb-2">
                    Service Area
                  </label>
                  <input
                    id="serviceArea"
                    name="serviceArea"
                    type="text"
                    required
                    value={formData.serviceArea}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Nationwide"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-200 mb-2">
                    Service Type
                  </label>
                  <input
                    id="serviceType"
                    name="serviceType"
                    type="text"
                    required
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="Catering, Event Planning"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
                  Business Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Tell us about your business..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-200 mb-2">
                    Website
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="https://www.example.com"
                  />
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-200 mb-2">
                    Instagram
                  </label>
                  <input
                    id="instagram"
                    name="instagram"
                    type="text"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="@yourbusiness"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-gray-200 mb-2">
                    Facebook
                  </label>
                  <input
                    id="facebook"
                    name="facebook"
                    type="text"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="facebook.com/yourbusiness"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-200 mb-2">
                    LinkedIn
                  </label>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="text"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="linkedin.com/company/yourbusiness"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering vendor...
                  </span>
                ) : (
                  'Register as Vendor'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-300">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-pink-400 hover:text-pink-300 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
