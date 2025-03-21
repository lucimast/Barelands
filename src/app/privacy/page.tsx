import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Barelands Photography",
  description: "Privacy Policy for Barelands Photography website"
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto bg-zinc-900 rounded-lg border border-zinc-800 p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-zinc-400 mb-6">Last updated: 21 March 2025</p>
          
          <div className="space-y-6 text-zinc-300">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>Barelands ("we," "us," or "our") operates the www.barelands.vip website (the "Service"). This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p>We collect several types of information for various purposes to provide and improve our Service to you:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <p><strong>Personal Data:</strong> While using our Service, we may ask you to provide certain personally identifiable information, including but not limited to:</p>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Postal address</li>
                    <li>Payment information</li>
                  </ul>
                </li>
                <li><p><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol (IP) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, and other diagnostic data.</p></li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Legal Basis for Processing Personal Data</h2>
              <p>We process your personal data based on the following legal grounds:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Performance of a Contract:</strong> To provide services you have requested, such as booking a photography session.</li>
                <li><strong>Consent:</strong> For sending newsletters or promotional materials, we will obtain your explicit consent.</li>
                <li><strong>Legitimate Interests:</strong> To improve our services and ensure the security of our website.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Use of Data</h2>
              <p>We use the collected data for various purposes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To provide you with news, special offers, and general information about other goods, services, and events we offer that are similar to those you have already purchased or enquired about, unless you have opted not to receive such information</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
              <p>We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Transfer of Data</h2>
              <p>Your information, including personal data, may be transferred to—and maintained on—computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p>
              <p className="mt-2">We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy, and no transfer of your personal data will take place to an organization or a country unless there are adequate controls in place, including the security of your data and other personal information.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Disclosure of Data</h2>
              <p>We may disclose your personal data in the good faith belief that such action is necessary to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Comply with a legal obligation</li>
                <li>Protect and defend our rights or property</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of users of the Service or the public</li>
                <li>Protect against legal liability</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Security of Data</h2>
              <p>The security of your data is important to us. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Your Data Protection Rights</h2>
              <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data. These rights include:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The right to access</li>
                <li>The right to rectification</li>
                <li>The right to erasure</li>
                <li>The right to restrict processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="mt-2">To exercise these rights, please contact us at the contact information provided below.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Service Providers</h2>
              <p>We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Links to Other Sites</h2>
              <p>Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
              <p className="mt-2">We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Changes to This Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
              <p className="mt-2">We will let you know via email and/or a prominent notice on our Service before the change becomes effective and update the "last updated" date at the top of this Privacy Policy.</p>
              <p className="mt-2">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">13. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <p className="mt-2">By visiting this page on our website: <Link href="/contact" className="text-blue-400 hover:text-blue-300">www.barelands.vip/contact</Link>.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 