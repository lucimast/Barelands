import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Barelands Photography",
  description: "Terms of Service for Barelands Photography website"
};

export default function TermsOfServicePage() {
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
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-zinc-400 mb-6">Last updated: March 21, 2025</p>
          
          <div className="space-y-6 text-zinc-300">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>Welcome to Barelands.vip ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website www.barelands.vip (the "Service") and the purchase of photographic prints ("Products") through our Service. By accessing or using our Service, you agree to be bound by these Terms.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Definitions</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Service:</strong> The website operated by Barelands.vip at www.barelands.vip.</li>
                <li><strong>Products:</strong> Photographic prints and related items available for purchase through our Service.</li>
                <li><strong>User:</strong> Any individual who accesses or uses our Service.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Orders and Payment</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <p><strong>Order Acceptance:</strong> All orders placed through our Service are subject to acceptance by us. We reserve the right to refuse or cancel any order for any reason, including inaccuracies or errors in Product or pricing information.</p>
                </li>
                <li>
                  <p><strong>Pricing:</strong> All prices are listed in euros (€) and include applicable taxes unless otherwise stated. We reserve the right to change prices at any time without prior notice.</p>
                </li>
                <li>
                  <p><strong>Payment Methods:</strong> We accept the following payment methods:</p>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Bank Transfer: Detailed instructions will be provided during the checkout process.</li>
                    <li>PayPal: You can pay using your PayPal account.</li>
                    <li>Skrill: Payments can be made via Skrill.</li>
                  </ul>
                  <p className="mt-1">By providing payment information, you represent and warrant that you have the legal right to use the payment method provided.</p>
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Shipping and Delivery</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Shipping:</strong> We offer shipping to addresses within the European Union. For shipments outside the European Union, please contact us to discuss options and associated costs.</li>
                <li><strong>Shipping Costs:</strong> Shipping costs are calculated at checkout and are the responsibility of the customer.</li>
                <li><strong>Delivery Time:</strong> Estimated delivery times are provided at checkout. While we strive to meet these estimates, we are not responsible for delays caused by carriers or unforeseen circumstances.</li>
                <li><strong>Risk of Loss:</strong> Risk of loss or damage to Products passes to you upon delivery to the designated address.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Returns and Refunds</h2>
              <p><strong>Return Policy:</strong> Due to the custom nature of our Products, all sales are final. We do not accept returns or offer refunds.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Intellectual Property and Limited License</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <p><strong>Ownership:</strong> All content on our Service, including images, text, graphics, logos, and designs, is the property of Barelands.vip and is protected by applicable intellectual property laws.</p>
                </li>
                <li>
                  <p><strong>Limited License:</strong> We grant you a limited, personal, non-transferable, non-sublicensable, revocable license to access and use the Service solely for your personal, non-commercial use, and only as presented by us. This license does not grant you any rights to:</p>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Modify, reproduce, or create derivative works based on the Service or its content.</li>
                    <li>Copy, frame, or mirror any part of the Service or its content.</li>
                    <li>Reverse engineer, disassemble, decompile, or otherwise attempt to discover the source code of the Service.</li>
                    <li>Access the Service to build a competitive product or service.</li>
                  </ul>
                  <p className="mt-1">Any unauthorized use of the Service or its content may violate copyright, trademark, and other laws. This license is effective only for the duration of your compliance with these Terms and may be terminated by us at any time without notice.</p>
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Barelands.vip shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our Service or the purchase of Products. Our total liability to you for any damages shall not exceed the amount paid by you for the Product related to the claim.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Governing Law</h2>
              <p>These Terms are governed by and construed in accordance with the laws of Belgium, without regard to its conflict of law principles. Any disputes arising from these Terms or your use of the Service shall be resolved in the courts of Belgium.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting on our Service. Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us through our contact page:</p>
              <p className="mt-2"><Link href="/contact" className="text-blue-400 hover:text-blue-300">www.barelands.vip/contact</Link></p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 