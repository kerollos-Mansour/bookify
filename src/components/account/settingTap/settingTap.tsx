import { Shield, Trash2, Mail, Smartphone, Lock, Monitor, Users } from "lucide-react";

const settingSections = [
  {
    title: "Sign-in and security",
    description: "Keep your account safe with a secure password and by signing out of devices you're not actively using.",
    fields: [
      { 
        label: "Email", 
        value: "keromorcos343@gmail.com",
        icon: <Mail className="w-4 h-4" />
      },
      { 
        label: "Mobile number", 
        value: "",
        icon: <Smartphone className="w-4 h-4" />
      },
      { 
        label: "Change password", 
        value: "",
        icon: <Lock className="w-4 h-4" />
      },
      { 
        label: "Connected devices", 
        value: "",
        icon: <Monitor className="w-4 h-4" />
      },
    ],
  },
  {
    title: "Account management",
    description: "Control other options to manage your data, like deleting your account.",
    fields: [
      { 
        label: "Traveler arranger", 
        value: "",
        icon: <Users className="w-4 h-4" />
      },
      { 
        label: "Delete account", 
        value: "Permanently delete your Expedia account and data",
        icon: <Trash2 className="w-4 h-4" />,
        destructive: true
      },
    ],
  },
];

export default function SettingTap() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* Main Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-900">Security and settings</h1>
        </div>
      </header>

      {/* Settings Sections */}
      <div className="space-y-8">
        {settingSections.map((section) => (
          <section key={section.title} className="space-y-6">
            {/* Section Header */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {section.title}
              </h2>
              <p className="text-sm text-gray-600">
                {section.description}
              </p>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Fields */}
            <div className="space-y-6">
              {section.fields.map((field) => (
                <div key={field.label} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`mt-1 p-2 rounded-lg ${
                        field.destructive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {field.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {field.label}
                        </h3>
                        {field.value && (
                          <p className={`text-sm mt-1 ${
                            field.destructive ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {field.value}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <button className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
                      field.destructive 
                        ? 'text-red-600 border-red-300 hover:bg-red-50' 
                        : field.label === "Mobile number"
                        ? 'text-blue-600 border-blue-300 hover:bg-blue-50'
                        : 'text-blue-600 border-blue-300 hover:bg-blue-50'
                    }`}>
                      {field.destructive 
                        ? 'Delete' 
                        : field.label === "Mobile number"
                        ? 'Add'
                        : field.label.includes('password') 
                        ? 'Change'
                        : 'Manage'
                      }
                    </button>
                  </div>
                  
                  {/* Divider between fields */}
                  <hr className="border-gray-300" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}