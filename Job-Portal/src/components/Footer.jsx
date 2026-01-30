
const Footer = () => {
  return (
    <footer className="bg-green-600 text-white pt-12 pb-4 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-black text-2xl font-bold mb-4">JobPortal</h3>
            <p className="text-white">Connecting talent with opportunity</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><a href="/jobs" className="text-white hover:text-blacktransition-colors">Browse Jobs</a></li>
              <li><a href="/dashboard" className="text-white hover:text-blacktransition-colors">My Applications</a></li>
              <li><a href="/" className="text-white hover:text-blacktransition-colors">Career Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><a href="/admin" className="text-white hover:text-blacktransition-colors">Post a Job</a></li>
              <li><a href="/admin" className="text-white hover:text-blacktransition-colors">Manage Jobs</a></li>
              <li><a href="/admin" className="text-white hover:text-blacktransition-colors">View Applicants</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <p className="text-white">Email: info@jobportal.com</p>
            <p className="text-white">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-gray-800 text-gray-900">
          <p>&copy; 2026 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
