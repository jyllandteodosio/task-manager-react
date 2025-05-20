import Link from "next/link";
import NavigationBar from "@/components/layouts/NavigationBar";

export default function Home() {
  const contactEmail = 'jylland.bienes@gmail.com';
  const emailSubject = 'Request to test TASKARU app';
  const emailBody = 'Hi,\n\nI would like to request access to test the TASKARU app.\n\nThanks!';

  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-[family-name:var(--font-geist-sans)]">
      <NavigationBar />

      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
            TASKARU
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Seamlessly share lists with TASKARU. Whether it's a shopping list for the family, a project to-do with friends, or your daily exercise routine, keep everyone on the same page.
          </p>

          <a
            href={mailtoLink}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-lg"
          >
            Request Test Access
          </a>

          <p className="text-gray-600 text-sm pt-8">
            Already have a test account?{' '}
            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Login here
            </Link>
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} TASKARU. All rights reserved.</p>
      </footer>
    </div>
  );
}
