const Privacy = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="w-full bg-[#221e1b] text-white py-20 text-center mt-25">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-lg text-gray-300 mt-2">
          Petra and Karl Erik Hedborg Foundation
        </p>
      </section>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 lg:px-24 py-20 md:pt-16">
        <p className="text-md text-gray-500 mb-8">Last updated: 29-Apr-2019</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar (Optional Links) */}
          <aside className="hidden md:block col-span-1">
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </li>
              {/* Additional links can be added here */}
            </ul>
          </aside>

          {/* Main Text Content */}
          <section className="col-span-4 md:col-span-3 space-y-8">
            <h2 className="text-2xl font-bold mb-4">Processing of Personal Data</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Information in accordance with EU General Data Protection Regulation 2016/679.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Purpose of the Foundation</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                The foundation supports relations between Sweden and Belgium through science, culture, and arts by assisting in training or teaching for Swedes in Belgium or Belgians in Sweden.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Personal Data Controller</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Niclas Lemne</strong>
                <br />
                Grönstavägen 18
                <br />
                181 43 Lidingö, Sverige
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Purpose of Personal Data Processing</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Personal data from scholarship applications is processed for compliance with legal obligations.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Categories of Personal Data</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Data includes name, address, social security number, contact details, bank details, CV, profession, and other information.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Disclosure of Personal Data</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Personal data may be shared with SEB for administrative tasks such as accounting and scholarship payments.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Personal Data Storage</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Data is stored as long as necessary to meet legal requirements, securely in services like iDrive.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-2">Applicants&apos; Rights</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Applicants can request access, deletion, or transfer of their personal data.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;