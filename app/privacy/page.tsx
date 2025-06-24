import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - PromptBox',
  description: 'Learn about how PromptBox protects your privacy with 100% local storage.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Last updated: January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Privacy Commitment
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PromptBox is built with privacy at its core. We believe your data should remain yours, 
                which is why we&apos;ve designed our application to work entirely within your browser without 
                any external data transmission.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  🛡️ 100% Local Storage - No data ever leaves your device
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Collection
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>We collect ZERO personal data.</strong> Here&apos;s what this means:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>No user accounts or registration required</li>
                <li>No tracking cookies or analytics</li>
                <li>No server-side data storage</li>
                <li>No third-party integrations that collect data</li>
                <li>No IP address logging</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                How Your Data is Stored
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All your prompts and settings are stored locally in your browser using:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>LocalStorage:</strong> Your prompts, categories, and preferences</li>
                <li><strong>Browser Memory:</strong> Temporary application state</li>
                <li><strong>No Cloud Storage:</strong> Nothing is uploaded to external servers</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> This means your data is tied to your specific browser on your device. 
                  If you clear your browser data or use a different browser, your prompts will not be available.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Since your data never leaves your device:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>No risk of data breaches on our servers (we don&apos;t have any)</li>
                <li>No unauthorized access to your prompts</li>
                <li>Complete control over your data</li>
                <li>Standard browser security protections apply</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PromptBox operates independently without relying on third-party services that could 
                compromise your privacy:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>No analytics platforms (Google Analytics, etc.)</li>
                <li>No CDNs that track usage</li>
                <li>No social media integrations</li>
                <li>No advertising networks</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Since we don&apos;t collect your data, you automatically have complete control:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>Data Access:</strong> All your data is accessible within the app</li>
                <li><strong>Data Portability:</strong> Export your prompts anytime (feature coming soon)</li>
                <li><strong>Data Deletion:</strong> Clear your browser data to remove everything</li>
                <li><strong>Data Correction:</strong> Edit your prompts directly in the app</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Updates to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We may update this privacy policy to reflect changes in our practices or for legal reasons. 
                Any changes will be posted on this page with an updated revision date. Since we don&apos;t collect 
                contact information, we encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                If you have questions about this privacy policy, please contact us through our 
                <a href="https://github.com/kaminono/PromptBox" className="text-indigo-600 dark:text-indigo-400 hover:underline"> GitHub repository</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 