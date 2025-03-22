"use client";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Login Disabled</h1>
      
      <div className="max-w-md p-6 bg-zinc-800/30 rounded-lg border border-zinc-700 mb-8">
        <p className="mb-4">
          The admin area is not available when deployed on GitHub Pages because GitHub Pages only supports static websites.
        </p>
        
        <p className="mb-4">
          To use the admin features, you need to:
        </p>
        
        <ol className="text-left list-decimal pl-6 mb-4 space-y-2">
          <li>Run the site locally with <code className="bg-zinc-800 px-1 rounded">npm run dev</code> or <code className="bg-zinc-800 px-1 rounded">bun run dev</code></li>
          <li>Log in with: 
            <ul className="list-disc pl-6 mt-1">
              <li>Email: admin@barelands.vip</li>
              <li>Password: Lm19421983</li>
            </ul>
          </li>
        </ol>
        
        <p>
          For full functionality including admin features, consider deploying to a platform that supports server-side functionality like Vercel or Netlify.
        </p>
      </div>
      
      <a 
        href="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
      >
        Return to Home Page
      </a>
    </div>
  );
}
