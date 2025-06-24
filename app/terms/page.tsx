import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - PromptBox',
  description: 'Terms of service for using PromptBox, the local AI prompt management tool.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Last updated: January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Agreement to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                By accessing and using PromptBox, you accept and agree to be bound by the terms and 
                provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Description of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PromptBox is a web-based application that allows users to create, organize, and manage 
                AI prompts locally in their browser. The service operates entirely client-side with no 
                server-side data storage or processing.
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>100% browser-based storage and processing</li>
                <li>No user registration or accounts required</li>
                <li>No data transmission to external servers</li>
                <li>Open-source and freely available</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Acceptable Use
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You agree to use PromptBox only for lawful purposes. You may not use the service:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>To store or create content that is illegal, harmful, or violates others&apos; rights</li>
                <li>To attempt to reverse engineer or modify the application maliciously</li>
                <li>To use the service in a way that could damage or impair the functionality</li>
                <li>To violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Content and Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You retain full ownership and control of any content you create in PromptBox:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li><strong>Ownership:</strong> You own all prompts and data you create</li>
                <li><strong>Responsibility:</strong> You are responsible for the content you store</li>
                <li><strong>No Access:</strong> We cannot access, view, or modify your content</li>
                <li><strong>Local Storage:</strong> Your data remains in your browser only</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Service Availability
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PromptBox is provided &quot;as is&quot; and &quot;as available&quot;:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>We do not guarantee continuous availability</li>
                <li>The service may be updated or modified without notice</li>
                <li>Your browser compatibility may affect functionality</li>
                <li>Local storage limitations apply based on your browser settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PromptBox is open-source software:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>The application code is available under an open-source license</li>
                <li>You may contribute to the project via GitHub</li>
                <li>The PromptBox name and branding remain our property</li>
                <li>Third-party libraries maintain their respective licenses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Disclaimers and Limitation of Liability
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  ⚠️ Important: Please read this section carefully
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>No Warranties:</strong> PromptBox is provided without any warranties, express or implied. 
                We do not warrant that the service will be error-free or uninterrupted.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>Data Loss:</strong> Since data is stored locally in your browser, we are not 
                responsible for any data loss due to browser issues, clearing storage, or device problems.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>Limitation of Liability:</strong> In no event shall we be liable for any indirect, 
                incidental, special, or consequential damages arising from your use of PromptBox.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Backup Responsibility
              </h2>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200 font-medium">
                  🚨 Critical: You are responsible for backing up your data
                </p>
                <p className="text-red-700 dark:text-red-300 mt-2">
                  Since all data is stored locally, clearing your browser data will permanently delete 
                  your prompts. We strongly recommend exporting your data regularly (feature coming soon).
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Modifications to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We reserve the right to modify these terms at any time. Changes will be posted on this page 
                with an updated revision date. Your continued use of PromptBox after changes constitutes 
                acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Open Source License
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PromptBox is released under an open-source license. You can:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                <li>View and study the source code</li>
                <li>Contribute improvements and bug fixes</li>
                <li>Fork the project for personal use</li>
                <li>Report issues and suggest features</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                Visit our <a href="https://github.com/kaminono/PromptBox" className="text-indigo-600 dark:text-indigo-400 hover:underline">GitHub repository</a> for more details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                If you have questions about these terms, please contact us through our 
                <a href="https://github.com/kaminono/PromptBox" className="text-indigo-600 dark:text-indigo-400 hover:underline"> GitHub repository</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 