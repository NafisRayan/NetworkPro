import React, { useState } from 'react';
import { 
  Bell, 
  Globe, 
  Lock,
  Mail,
  Moon,
  Shield,
  User,
  Webhook,
  Wifi,
  Sliders,
  Save
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    jobAlerts: true,
    contactUpdates: false,
    marketingInsights: true,
    securityAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    allowMessaging: true
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: '••••••••••••••••',
    webhookUrl: 'https://api.networkai.com/webhook',
    maxRequests: '1000'
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC-8'
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="text-neutral-500">Manage your account preferences and configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-primary-100 text-primary-500">
                    <User size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-text">Profile Settings</h2>
                    <p className="text-sm text-neutral-500">Update your personal information</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" icon={<Save size={16} />}>
                  Save Changes
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Company</label>
                  <input
                    type="text"
                    defaultValue="Tech Innovations Inc."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Senior Software Engineer with expertise in AI and automation technologies."
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </Card>

          {/* API Settings */}
          <Card className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-secondary-100 text-secondary-500">
                  <Webhook size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-text">API Configuration</h2>
                  <p className="text-sm text-neutral-500">Manage your API keys and webhooks</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">API Key</label>
                  <div className="flex space-x-2">
                    <input
                      type="password"
                      value={apiSettings.apiKey}
                      readOnly
                      className="flex-1 px-3 py-2 border border-neutral-200 rounded-md bg-neutral-50"
                    />
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Webhook URL</label>
                  <input
                    type="url"
                    value={apiSettings.webhookUrl}
                    onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Rate Limit (requests/hour)</label>
                  <input
                    type="number"
                    value={apiSettings.maxRequests}
                    onChange={(e) => setApiSettings({ ...apiSettings, maxRequests: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary-100 text-primary-500">
                  <Bell size={20} />
                </div>
                <h2 className="text-lg font-medium text-text">Notifications</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-text">Email Digest</span>
                  <input
                    type="checkbox"
                    checked={notifications.emailDigest}
                    onChange={(e) => setNotifications({ ...notifications, emailDigest: e.target.checked })}
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-text">Job Alerts</span>
                  <input
                    type="checkbox"
                    checked={notifications.jobAlerts}
                    onChange={(e) => setNotifications({ ...notifications, jobAlerts: e.target.checked })}
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-text">Contact Updates</span>
                  <input
                    type="checkbox"
                    checked={notifications.contactUpdates}
                    onChange={(e) => setNotifications({ ...notifications, contactUpdates: e.target.checked })}
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-text">Marketing Insights</span>
                  <input
                    type="checkbox"
                    checked={notifications.marketingInsights}
                    onChange={(e) => setNotifications({ ...notifications, marketingInsights: e.target.checked })}
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-text">Security Alerts</span>
                  <input
                    type="checkbox"
                    checked={notifications.securityAlerts}
                    onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>
              </div>
            </div>
          </Card>

          {/* Privacy */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-secondary-100 text-secondary-500">
                  <Lock size={20} />
                </div>
                <h2 className="text-lg font-medium text-text">Privacy</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Profile Visibility</label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="connections">Connections Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-text">Show Email</span>
                  <input
                    type="checkbox"
                    checked={privacy.showEmail}
                    onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-text">Show Phone</span>
                  <input
                    type="checkbox"
                    checked={privacy.showPhone}
                    onChange={(e) => setPrivacy({ ...privacy, showPhone: e.target.checked })}
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-text">Allow Messaging</span>
                  <input
                    type="checkbox"
                    checked={privacy.allowMessaging}
                    onChange={(e) => setPrivacy({ ...privacy, allowMessaging: e.target.checked })}
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-success-100 text-success-500">
                  <Sliders size={20} />
                </div>
                <h2 className="text-lg font-medium text-text">Preferences</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Theme</label>
                  <select
                    value={preferences.theme}
                    onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Timezone</label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">UTC</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;