import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback - PromptBox',
  description: 'Share your feedback and help improve PromptBox for everyone.',
};

export default function FeedbackPage() {
  const feedbackContent = `# Share Your Feedback

We value your input and want to make PromptBox better for everyone! Your feedback helps us understand what works well and what needs improvement.

## 🌟 How to Provide Feedback

### GitHub Issues (Recommended)
The best way to share feedback is through our [GitHub repository](https://github.com/kaminono/PromptBox):

1. **Bug Reports**: Found a bug? [Create an issue](https://github.com/kaminono/PromptBox/issues/new) with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and device information

2. **Feature Requests**: Have an idea? [Submit a feature request](https://github.com/kaminono/PromptBox/issues/new) with:
   - Description of the feature
   - Why it would be useful
   - How you envision it working

3. **General Feedback**: Share your thoughts about:
   - User experience
   - Interface design
   - Performance issues
   - Documentation improvements

### GitHub Discussions
For broader conversations, join our [GitHub Discussions](https://github.com/kaminono/PromptBox/discussions):
- Share your use cases
- Ask questions
- Connect with other users
- Suggest improvements

## 📋 Feedback Categories

### 🐛 Bug Reports
Help us squash bugs by reporting:
- Application crashes or errors
- Unexpected behavior
- Performance issues
- Browser compatibility problems
- Data loss or corruption

### ✨ Feature Requests
We'd love to hear your ideas for:
- New prompt organization features
- Import/export capabilities
- Search and filtering improvements
- UI/UX enhancements
- Accessibility features

### 🎨 Design Feedback
Share your thoughts on:
- Visual design and aesthetics
- User interface clarity
- Mobile responsiveness
- Dark mode experience
- Color scheme preferences

### 🚀 Performance & Usability
Let us know about:
- Loading times
- Responsiveness
- Ease of use
- Navigation issues
- Workflow improvements

## 🎯 What Makes Good Feedback?

### For Bug Reports:
- **Be Specific**: "The save button doesn't work" → "The save button becomes unresponsive after editing a prompt with more than 1000 characters"
- **Include Context**: Browser version, device type, steps taken
- **Attach Screenshots**: Visual evidence helps tremendously

### For Feature Requests:
- **Explain the Problem**: What current limitation are you facing?
- **Describe the Solution**: How would your proposed feature solve it?
- **Consider Alternatives**: Are there other ways to address the issue?

### For General Feedback:
- **Be Constructive**: Focus on improvement rather than just criticism
- **Share Your Workflow**: How do you use PromptBox? What works/doesn't work?
- **Think About Others**: Would your suggestion benefit other users?

## 🏆 Community Guidelines

When providing feedback, please:

### ✅ Do:
- Be respectful and constructive
- Search existing issues before creating new ones
- Provide clear, detailed descriptions
- Follow up on your submissions
- Help others with their issues

### ❌ Don't:
- Spam or duplicate submissions
- Use offensive or inappropriate language
- Submit off-topic content
- Demand immediate fixes or features
- Share sensitive personal information

## 📈 Your Impact

Your feedback directly influences PromptBox development:

- **Bug fixes** typically get priority based on severity and user impact
- **Popular feature requests** are more likely to be implemented
- **UI/UX suggestions** help us improve the overall experience
- **Performance reports** help us optimize the application

## 🔄 Feedback Process

1. **Submit**: Share your feedback via GitHub
2. **Review**: Our team reviews all submissions
3. **Discussion**: We may ask for clarification or additional details
4. **Implementation**: Valid issues and popular features get prioritized
5. **Update**: You'll be notified when your feedback is addressed

## 🎁 Recognition

We appreciate our contributors! Regular feedback providers may be:
- Mentioned in release notes
- Invited to beta test new features
- Recognized in our community showcase

## 📞 Alternative Contact Methods

While GitHub is preferred, you can also:
- Email us at: [feedback@promptbox.dev](mailto:feedback@promptbox.dev) *(coming soon)*
- Tweet us: [@PromptBoxApp](https://twitter.com/PromptBoxApp) *(coming soon)*

## 🙏 Thank You!

Every piece of feedback, no matter how small, helps make PromptBox better. We're grateful for users like you who take the time to share their thoughts and help improve the application for everyone.

---

*Remember: PromptBox is open-source and community-driven. Your feedback doesn't just help us – it helps every user who will benefit from the improvements you suggest!*`;

  // Simple markdown to HTML conversion for basic formatting
  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              {line.replace('### ', '')}
            </h3>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              {line.replace('## ', '')}
            </h2>
          );
        }
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {line.replace('# ', '')}
            </h1>
          );
        }
        
        // Lists
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-gray-600 dark:text-gray-400 ml-4">
              {line.replace('- ', '')}
            </li>
          );
        }
        
        // Links
        if (line.includes('[') && line.includes('](')) {
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          const parts = line.split(linkRegex);
          return (
            <p key={index} className="text-gray-600 dark:text-gray-400 mb-4">
              {parts.map((part, i) => {
                if (i % 3 === 1) {
                  return (
                    <a
                      key={i}
                      href={parts[i + 1]}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {part}
                    </a>
                  );
                } else if (i % 3 === 2) {
                  return null;
                } else {
                  return part;
                }
              })}
            </p>
          );
        }
        
        // Bold text
        if (line.includes('**')) {
          const boldRegex = /\*\*([^*]+)\*\*/g;
          const parts = line.split(boldRegex);
          return (
            <p key={index} className="text-gray-600 dark:text-gray-400 mb-4">
              {parts.map((part, i) => 
                i % 2 === 1 ? (
                  <strong key={i} className="font-semibold text-gray-900 dark:text-white">
                    {part}
                  </strong>
                ) : (
                  part
                )
              )}
            </p>
          );
        }
        
        // Code/italic
        if (line.includes('*') && !line.includes('**')) {
          const italicRegex = /\*([^*]+)\*/g;
          const parts = line.split(italicRegex);
          return (
            <p key={index} className="text-gray-600 dark:text-gray-400 mb-4">
              {parts.map((part, i) => 
                i % 2 === 1 ? (
                  <em key={i} className="italic">
                    {part}
                  </em>
                ) : (
                  part
                )
              )}
            </p>
          );
        }
        
        // Horizontal rule
        if (line === '---') {
          return <hr key={index} className="border-gray-300 dark:border-gray-600 my-8" />;
        }
        
        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-2" />;
        }
        
        // Regular paragraphs
        return (
          <p key={index} className="text-gray-600 dark:text-gray-400 mb-4">
            {line}
          </p>
        );
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {renderMarkdown(feedbackContent)}
          </div>
        </div>
      </div>
    </div>
  );
} 